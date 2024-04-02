joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.down, function () {
    datalogger.log(
    datalogger.createCV("button", "E"),
    datalogger.createCV("inicialised", inicialised),
    datalogger.createCV("send variable name", "drive"),
    datalogger.createCV("send variable value", code(50, -50))
    )
    if (inicialised && cross_control) {
        radio.sendValue("drive", code(-50, -50))
    }
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.down, function () {
    datalogger.log(
    datalogger.createCV("button", "C"),
    datalogger.createCV("inicialised", inicialised),
    datalogger.createCV("send variable name", "drive"),
    datalogger.createCV("send variable value", code(-50, 50))
    )
    if (inicialised && cross_control) {
        radio.sendValue("drive", code(-50, 50))
    }
})
input.onButtonPressed(Button.A, function () {
    datalogger.log(
    datalogger.createCV("button", "A"),
    datalogger.createCV("inicialised", inicialised),
    datalogger.createCV("send variable name", "drive"),
    datalogger.createCV("send variable value", code(0, 0))
    )
    radio.sendValue("drive", code(0, 0))
})
input.onButtonPressed(Button.AB, function () {
    datalogger.log(
    datalogger.createCV("button", "A+B"),
    datalogger.createCV("inicialised", inicialised)
    )
    cross_control = !(cross_control)
})
// Zakóduje informaci o požadovaném pohybu obou motorů do jediného čísla
// - LM speed ... požadovaná rychlost levého motoru
// - RM speed ... požadovaná rychlost pravého motoru
function code (LM_speed: number, RM_speed: number) {
    return (100 + LM_speed) * 1000 + (100 + RM_speed)
}
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function () {
    datalogger.log(
    datalogger.createCV("button", "D"),
    datalogger.createCV("inicialised", inicialised),
    datalogger.createCV("send variable name", "drive"),
    datalogger.createCV("send variable value", code(50, 50))
    )
    if (inicialised && cross_control) {
        radio.sendValue("drive", code(50, 50))
    }
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    datalogger.log(
    datalogger.createCV("button", "F"),
    datalogger.createCV("inicialised", inicialised),
    datalogger.createCV("send variable name", "drive"),
    datalogger.createCV("send variable value", code(50, -50))
    )
    if (inicialised && cross_control) {
        radio.sendValue("drive", code(50, -50))
    }
})
let steering_speed = 0
let ratio = 0
let steering = 0
let speed = 0
let X = 0
let Y = 0
let cross_control = false
let inicialised = false
radio.setGroup(128)
inicialised = false
datalogger.setColumnTitles(
"button",
"inicialised",
"send variable name",
"send variable value",
"rocker value X",
"rocker value Y"
)
datalogger.includeTimestamp(FlashLogTimeStampFormat.Seconds)
joystickbit.initJoystickBit()
inicialised = true
cross_control = false
basic.forever(function () {
    if (cross_control) {
        basic.showLeds(`
            . . # . .
            . . # . .
            # # . # #
            . . # . .
            . . # . .
            `)
    } else {
        basic.showLeds(`
            . # # # .
            # . . . #
            # . # . #
            # . . . #
            . # # # .
            `)
    }
    basic.pause(1000)
})
basic.forever(function () {
    if (!(cross_control)) {
        Y = Math.round(Math.map(joystickbit.getRockerValue(joystickbit.rockerType.Y), 0, 1023, -100, 100))
        X = Math.round(Math.map(joystickbit.getRockerValue(joystickbit.rockerType.X), 1023, 0, -100, 100))
        speed = Math.round(Math.sqrt(X ** 2 + Y ** 2))
        if (speed > 100) {
            speed = 100
        } else if (speed < 15) {
            speed = 0
        }
        if (Y < 0) {
            speed = -1 * speed
        }
        steering = Math.abs(Y) - Math.abs(X)
        ratio = speed / 100
        steering_speed = Math.round(speed * ratio)
        if (steering_speed < 15 && steering_speed > -15) {
            steering_speed = 0
        }
        if (X < 0) {
            radio.sendValue("drive", code(speed, steering_speed))
        } else {
            radio.sendValue("drive", code(steering_speed, speed))
        }
        datalogger.log(
        datalogger.createCV("button", "joystick"),
        datalogger.createCV("inicialised", inicialised),
        datalogger.createCV("send variable name", "drive"),
        datalogger.createCV("send variable value", code(speed, steering_speed)),
        datalogger.createCV("rocker value X", X),
        datalogger.createCV("rocker value Y", Y)
        )
        basic.pause(50)
    }
})
