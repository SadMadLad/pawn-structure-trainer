export default function Controller({ popHistory, handlePgn, controls, moveBack, moveForward }) {
  const moves = "1. e4 c5 2. Nf3 g6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6 6. Be2 Bg7 7. Be3 Bd7 8. O-O O-O 9. f3 Nc6 10. Qd2 a6 11. Rad1 Rc8 12. Kh1 Qc7 13. Nxc6 Bxc6 14. Bd4 b5 15. a3 Qb7 16. Bd3 Rfd8 17. Qf2 Re8 18. Ne2 e5 19. Bc3 d5 20. Ng3 dxe4 21. Bxe4 Bxe4 22. Nxe4 Nxe4 23. fxe4 Rc4 24. Rde1 Rd8 25. Qe3 Rdc8 26. Re2 R4c7 27. Rd2 Rd7 28. Rfd1 Rcd8 29. Ba5 Rxd2 30. Rxd2 Rxd2 31. Qxd2 Bf6 32. Qd6 Kg7 33. Bb4 h5 34. h3 Qc8 35. Bc3 Qe6 36. Qxe6 fxe6 37. g3 Kf7 38. Kg2 Ke8 39. Kf3 g5 40. g4 h4 41. Ba5 Kd7 42. Ke3 Kc6 43. Kd3 Be7 44. Kc3 Bc5 45. Bd8 Be3 46. Bf6 Bf4 47. Kb4 Bd2+ 48. Kb3 Bf4 49. c4 Kb6 50. cxb5 axb5 51. a4 Kc6 52. a5 Kc5 53. Bd8 Bd2 54. Kc2 Bf4 55. a6 Kc6 56. Kc3 Be3 57. b3 Bc1 58. a7 Kb7 59. Kb4 Kxa7 60. Kxb5"
  const buttonClass = "bg-gray-400 hover:bg-gray-700 text-white font-bold px-5 py-4 rounded mx-2"

  return (
    <div className="flex bg-chess-darker text-white font-bold" style={{ width: 300, height: 500 }}>
      <p className="overflow-scroll h-3/5 bg-chess-dark m-3 p-3">
        {moves}
      </p>
      <button className={buttonClass} onClick={popHistory}>Undo Move</button>
      <div>
        <label htmlFor="file-upload" className={buttonClass}>
          Upload PGN
        </label>
        <input className="hidden" id="file-upload" type="file" onChange={handlePgn} />
      </div>
      {
        controls &&
        <>
          <button className={buttonClass} onClick={moveBack}>{'<'}</button>
          <button className={buttonClass} onClick={moveForward}>{'>'}</button>
        </>
      }
    </div>
  )
}