/* Generic Charcoal Button with Text and a method associated */

export default function Default({ content, method }) {
  return (
    <button
      className="rounded bg-gray-700 p-3 font-bold text-white hover:bg-gray-900"
      onClick={method}
    >
      {content}
    </button>
  );
}
