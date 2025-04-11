export default function TestButton() {
  function test(): void {}

  return (
    <button className="big-button" onClick={test}>
      TEST
    </button>
  )
}
