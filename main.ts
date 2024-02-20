joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.down, function () {
    datalogger.log(
    datalogger.createCV("button", "E"),
    datalogger.createCV("inicialised", inicialised),
    datalogger.createCV("send variable name", "drive"),
    datalogger.createCV("send variable value", code(50, -50))
    )
    if (inicialised) {
        radio.sendValue("drive", code(-50, -50))
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
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    datalogger.log(
    datalogger.createCV("button", "F"),
    datalogger.createCV("inicialised", inicialised),
    datalogger.createCV("send variable name", "drive"),
    datalogger.createCV("send variable value", code(50, -50))
    )
    if (inicialised) {
        radio.sendValue("drive", code(50, -50))
    }
})
input.onButtonPressed(Button.AB, function () {
    datalogger.log(
    datalogger.createCV("button", "A+B"),
    datalogger.createCV("inicialised", inicialised)
    )
})
// Zakóduje informaci o požadovaném pohybu obou motorů do jediného čísla
// - LM speed ... požadovaná rychlost levého motoru
// - RM speed ... požadovaná rychlost pravého motoru
function code (LM_speed: number, RM_speed: number) {
    return (100 + LM_speed) * 1000 + (100 + RM_speed)
}
input.onButtonPressed(Button.B, function () {
    datalogger.log(
    datalogger.createCV("button", "B"),
    datalogger.createCV("inicialised", inicialised)
    )
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function () {
    datalogger.log(
    datalogger.createCV("button", "D"),
    datalogger.createCV("inicialised", inicialised),
    datalogger.createCV("send variable name", "drive"),
    datalogger.createCV("send variable value", code(50, 50))
    )
    if (inicialised) {
        radio.sendValue("drive", code(50, 50))
    }
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.down, function () {
    datalogger.log(
    datalogger.createCV("button", "C"),
    datalogger.createCV("inicialised", inicialised),
    datalogger.createCV("send variable name", "drive"),
    datalogger.createCV("send variable value", code(-50, 50))
    )
    if (inicialised) {
        radio.sendValue("drive", code(-50, 50))
    }
})
let inicialised = false
radio.setGroup(19)
inicialised = false
datalogger.setColumnTitles(
"button",
"inicialised",
"send variable name",
"send variable value"
)
datalogger.includeTimestamp(FlashLogTimeStampFormat.Seconds)
joystickbit.initJoystickBit()
basic.showIcon(IconNames.House)
inicialised = true
