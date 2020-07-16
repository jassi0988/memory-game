const source = 'image/i'
const blankimagesrc = 'image/blank.png'
const ext = '.png'
let imgsrc = []
const checkrandom1 = []
const checkrandom2 = []
let hidecount = 0
let clickedImg1 = ''
var ClickedImg2 = ''
let score = 0

function start () {
    generateRandom()
    document.getElementById('score').innerHTML = '0'
}
// by default hidding the card div
$('#displayGame').hide()
$('#complete').hide()

// removing class when hovered outside the image blocks
$('#cards').hover(function () {
    $('#cards img').removeClass('hover')
})

// hover effect on image blocks
$('img').hover(function () {
    $('#cards img').removeClass('hover')
    $(this).addClass('hover')
})
$('#btn').click(function () {
    $('#btn').hide()
    $('#displayGame').show()
    timer()
})
// function when start over button is clicked
$('#finish').click(function () {
    document.getElementById('finalScore').innerHTML = score
    document.getElementById('finalTotalTime').innerHTML = minutes < 10 ? '0' + minutes + ' : ' + seconds : minutes + ' : ' + seconds
    $('#displayGame').hide()
    $('#complete').show()
    start()
})
$('#startAgain').click(function () {
    $('#complete').hide()
    $('#btn').show()
    start()
})
let cId

function flip (ClickedId) {
    cId = ClickedId
    if (hidecount < 2) {
        document.getElementById(ClickedId).src = source + imgsrc[ClickedId] + ext

        if (hidecount < 1) {
            clickedImg1 = ClickedId
            hidecount++
        } else {
            if (clickedImg1 !== ClickedId) {
                ClickedImg2 = ClickedId
                hidecount++
                check(clickedImg1, ClickedImg2)
            } else {
                clickedImg1 = ClickedId
            }
        }
    } else {
        reset(ClickedId, clickedImg1, ClickedImg2)
    }
}

function reset (ClickedId, clickedImg1, ClickedImg2) {
    hidecount = 0
    document.getElementById(clickedImg1).src = blankimagesrc
    document.getElementById(ClickedImg2).src = blankimagesrc
    flip(ClickedId)
}

function check (clickedImg1, ClickedImg2) {
    let flag = 0
    if (imgsrc[clickedImg1] === imgsrc[ClickedImg2]) {
        flag = 1
        document.getElementById(clickedImg1).src = source + imgsrc[clickedImg1] + ext
        document.getElementById(ClickedImg2).src = source + imgsrc[ClickedImg2] + ext
        hidecount = 0
        score += 10
        document.getElementById('score').innerHTML = score
    }
}

function generateRandom () {
    while (checkrandom1.length < 8) {
        const rand = Math.floor(Math.random() * Math.floor(8))
        if (checkrandom1.indexOf(rand) === -1) {
            checkrandom1.push(rand)
        }
    }
    while (checkrandom2.length < 8) {
        const rand = Math.floor(Math.random() * Math.floor(8))
        if (checkrandom2.indexOf(rand) === -1) {
            checkrandom2.push(rand)
        }
    }
    imgsrc = checkrandom2.concat(checkrandom1)
}
let minutes = 0
let seconds = 0
function timer () {
    setInterval(() => {
        if (seconds === 60) {
            minutes++
            seconds = 0
        } else {
            seconds++
        }
        document.getElementById('totalTime').innerHTML = minutes < 10 ? '0' + minutes + ' : ' + seconds : minutes + ' : ' + seconds
    }, 1000)
}
