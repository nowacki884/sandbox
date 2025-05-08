export default function FullscreenButton() {
  function setFullscreen(): void {
    const elem = document.body
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    }
  }
  return (
    <button onClick={setFullscreen}>
      <i className="fa fa-window-maximize"></i>
    </button>
  )
}
