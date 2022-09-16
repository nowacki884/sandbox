const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            await navigator.serviceWorker.register("./sw.js", {
                scope: "/",
            })
        } catch (error) {
            console.error(`Registration failed with ${error}`)
        }
    }
}

registerServiceWorker();

const startButton = document.querySelector('.start_button')

function toggleView() {
    const formClasslist = document.querySelector('.form_wrapper').classList
    const timeClasslist = document.querySelector('.time_wrapper').classList
    formClasslist.toggle('hide')
    timeClasslist.toggle('hide')
}


const windowWidth = window.innerWidth

function initTimer() {
    toggleView()

    const minutes = document.querySelector('.minutes_input').valueAsNumber
    const seconds = document.querySelector('.seconds_input').valueAsNumber

    let minutesLeft = minutes
    let secondsLeft = seconds

    function showTime(minutes, seconds) {
        const timeDisplay = document.querySelector('.time_wrapper h1')
        timeDisplay.textContent = `${ minutes }:${ seconds < 10 ? `0${ seconds }` : seconds }`
    }

    showTime(minutesLeft, secondsLeft)

    const totalTimeInSeconds = (minutes * 60) + seconds
    
    const interval = setInterval(() => {
        let timeLeftInSeconds = (minutesLeft * 60) + secondsLeft
        const barChunkSize = Math.round(windowWidth / totalTimeInSeconds)
        const currentBarWidth = barChunkSize * (timeLeftInSeconds - 1)

        document.querySelector('.timer_bar').style.width = `${currentBarWidth}px`

        if (minutesLeft === 0 && secondsLeft === 0) {
            toggleView()
            clearInterval(interval)
            return
        }

        if (secondsLeft === 0) {
            minutesLeft -= 1
            secondsLeft = 59
        } else {
            secondsLeft -= 1
        }

        showTime(minutesLeft, secondsLeft)
    }, 1000)
}

startButton.addEventListener('click', initTimer)