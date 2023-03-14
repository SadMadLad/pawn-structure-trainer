import { useState } from "react";
import { Chess } from "chess.js";

import MainBoard from "./MainBoard";
import PawnBoard from "./PawnBoard";

export default function SharedBoard() {
  const [pawnFen, setPawnFen] = useState('8/pppppppp/8/8/8/8/PPPPPPPP/8 w - - 1 1');
  const [game, setGame] = useState(new Chess())
  const [movesDisplay, setMovesDisplay] = useState('')

  // PGN related states
  const [counter, setCounter] = useState(0)
  const [pgnMoves, setPgnMoves] = useState([])
  const [controls, setControls] = useState(false)

  // Core Methods
  const fetchPawnPositions = board => {
    const pawns = {}

    board.forEach(row => {
      row.forEach(square => {
        if (square) {
          if (square.type === 'p') {
            pawns[square.square] = `${square.color}${square.type.toUpperCase()}`
          }
        }
      })
    })
    return pawns
  }

  const updateBoard = (move = false, undo = false, pgn = false, reset = false) => {
    const gameCopy = new Chess()
    if (!reset) { gameCopy.loadPgn(game.pgn()) }
    if (move) { gameCopy.move(move) }
    if (undo) { gameCopy.undo() }
    if (pgn) {
      if (pgn === 'forward' && counter < pgnMoves.length) {
        const increaseCounter = counter + 1
        setCounter(increaseCounter)
        updateBoard(pgnMoves[counter], false, false)
        return
      }
      else if (pgn === 'back' && counter > 0) {
        const decreaseCounter = counter - 1
        setCounter(decreaseCounter)
        updateBoard(false, true, false)
        return
      }
    }

    const pawnPositions = fetchPawnPositions(gameCopy.board())

    setGame(gameCopy)
    setPawnFen(pawnPositions)
    setMovesDisplay(gameCopy.pgn())
  }

  // Board State Methods
  const makeMove = (sourceSquare, targetSquare) => {
    const move = { from: sourceSquare, to: targetSquare }
    try {
      updateBoard(move);
    } catch (err) {
      console.log(err)
      console.log('Invalid Move')
    }
  }

  const popHistory = () => {
    updateBoard(false, true);
  }


  // PGN file controls
  const handlePgn = (e) => {
    const fileReader = new FileReader();
    const pgn = e.target.files[0];

    fileReader.readAsText(pgn, 'UTF-8')
    fileReader.onload = function (evt) {
      setControls(true)

      const pgnGame = new Chess()
      pgnGame.loadPgn(evt.target.result)

      setControls(true)
      setPgnMoves(pgnGame.history())
      updateBoard(false, false, false, true)
    }
  }

  const moveForward = () => {
    updateBoard(false, false, 'forward')
  }
  const moveBack = () => {
    updateBoard(false, false, 'back')
  }

  const buttonClass = "bg-gray-400 hover:bg-gray-700 text-white font-bold px-5 py-4 rounded mx-2"

  return (
    <div>
      <div className="py-2 flex flex-col sm:flex-row justify-around">
        <div>
          <MainBoard game={game} makeMove={makeMove} />

        </div>
        <div>
          <PawnBoard fen={pawnFen} />
        </div>
      </div>
      <div className='grid grid-cols-12'>
        <div className='col-span-1'></div>
        <div className="col-span-4 flex justify-center items-center my-2">
          <button className={buttonClass} onClick={popHistory}>Undo Move</button>
          <label htmlFor="file-upload" className={buttonClass}>
            Upload PGN
          </label>
          <input className="hidden" id="file-upload" type="file" onChange={handlePgn} />
        </div>
        <div className="col-span-2 flex justify-center items-center">
          {
            controls &&
            <>
              <button className={buttonClass} onClick={moveBack}>{'<'}</button>
              <button className={buttonClass} onClick={moveForward}>{'>'}</button>
            </>
          }
        </div>
        <div className="col-span-4"></div>

      </div>
      <div className="text-center px-8 my-2">{movesDisplay}</div>
    </div>
  );
}
