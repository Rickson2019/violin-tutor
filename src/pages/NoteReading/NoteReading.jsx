import React, { useEffect, useState } from 'react'
// import { Score } from 'react-vexflow'
import $ from 'jquery'
import vexflow from 'vexflow';
import { Button } from '@material-ui/core'

const VF = vexflow.Flow;
var renderer

// 数据

// 按照字组分
var keys_3 = ['g/3', 'a/3', 'b/3']
var keys_4 = ["c/4", "d/4", "e/4", 'f/4', 'g/4', 'a/4', 'b/4']
var keys_5 = ["c/5", "d/5", "e/5", 'f/5', 'g/5', 'a/5', 'b/5']
var keys_6 = ["c/6", "d/6", "e/6", 'f/6', 'g/6', 'a/6', 'b/6']
var keys_7 = ["c/7", "d/7"]

// 按照音分
var keys_C = ['c/4', 'c/5', 'c/6', 'c/7']
var keys_D = ['d/3', 'd/4', 'd/5', 'd/6']
var keys_E = ['e/4', 'e/5', 'e/6']
var keys_F = ['f/4', 'f/5', 'f/6']
var keys_G = ['g/3', 'g/4', 'g/5', 'g/6']
var keys_A = ['b/3', 'a/4', 'a/5', 'a/6']
var keys_B = ['b/3', 'b/4', 'b/5', 'b/6']

// 按照音程分

// 二度
var inteval_2 = [['g/3', 'a/3'], ['a/3', 'b/3'], ['b/3', 'c/4'], ['c/4', 'd/4'], ['d/4', 'e/4'], ['e/4', 'f/4'], ['f/4', 'g/4'], ['g/4', 'a/4'], ['a/4', 'b/4'],

]

// 三度
var inteval_3 = [['g/3', 'b/3'], ['a/3', 'c/4'], ['b/3', 'd/4'],
['c/4', 'e/4'], ['d/4', 'f/4'], ['e/4', 'g/4'], ['f/4', 'a/4'], ['g/4', 'b/4'], ['a/4', 'c/5'], ['b/4', 'd/5'],
['c/5', 'e/5'], ['d/5', 'f/5'], ['g/5', 'b/5'], ['a/5', 'c/6'], ['b/5', 'd/6'],
['c/6', ' e/6'], ['d/6', 'f/6'], ['g/6', 'b/6'], ['a/6', 'c/7'], ['b/6', 'd/7'],
]

// 四度 
var inteval_4 = [['g/3', 'c/3'], ['a/3', 'd/4'], ['b/3', 'e/4'],
['c/4', 'f/4'], ['d/4', 'g/4'], ['e/4', 'a/4'], ['f/4', 'b/4'], ['g/4', 'c/4'], ['a/4', 'd/5'], ['']]

var accidental = ['', '#', 'b']




// var groups = [keys_3, keys_4, keys_5, keys_6, keys_7]


// 答案选择
// var answers = 




// 课程
var units_obj = {
    'Random': 'random',
    'All Notes': 'all_notes',
    'Octave Training': 'octave_training',
    'Inteval Challenge': 'inteval_challenge'
}

var units_arr = [
    'Random',
    'All Notes',
    'Octave Training',
    'Inteval Challenge'
]



export default function NoteReading() {

    const [configStep, configStepSetting] = useState(1)

    const [chosenUnit, setChosenUnit] = useState(null)

    const [startedBool, setStarted] = useState(false)

    const [mountedQuestion, mountQuestion] = useState('')

    const [choices, setChoices] = useState([''])

    const [answerCheck, setAnswerCheck] = useState('Choose an answer')


    const [answerChoices, setAnswerChoices] = useState(['C', 'D', 'E', 'F', 'G', 'A', 'B'])

    const [groups, setGroups] = useState([keys_3, keys_4, keys_5, keys_6, keys_7])



    const handleNext = () => {
        // configStepSetting(configStep + 1 )

        $('#score-display > svg').html('')

        // 局部全局变量
        var key
        var rand_accidental = '#'

        function __change_notes() {

            let rand_group = Math.floor(Math.random() * groups.length)
            let rand_key = Math.floor(Math.random() * groups[rand_group].length)
            console.log('__change_notes')

            key = groups[rand_group][rand_key]

            console.log('key')
            console.log(key)

            if (typeof key === 'string') {

                mountQuestion(key.substring(0, 1))
            }
            else if (typeof key === 'object') {
                console.log(key)
                mountQuestion(key)
            }
        }



        function __change_accidental() {
            rand_accidental = Math.floor(Math.random() * accidental.length)
        }

        function __render() {
            // Configure the rendering context.
            renderer.resize(300, 200);
            var context = renderer.getContext();
            context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

            // Create a stave of width 400 at position 10, 40 on the canvas.
            var stave = new VF.Stave(10, 40, 400);

            // Add a clef and time signature.
            stave.addClef("treble");

            // Connect it to the rendering context and draw!
            stave.setContext(context).draw();



            var notes = []

            if (typeof key === 'string') {
                if (rand_accidental === '') {
                    notes = [
                        new VF.StaveNote({ clef: "treble", keys: [key], duration: "8" })
                        // .addAccidental(0, new VF.Accidental(rand_accidental))
                    ];
                }
                else if (rand_accidental !== '') {
                    notes = [
                        new VF.StaveNote({ clef: "treble", keys: [key], duration: "8" })
                        .addAccidental(0, new VF.Accidental(rand_accidental))
                    ];
                }
            }
            else if (typeof key === 'object') {
                console.log('rand_accidental')
                console.log(rand_accidental)
                if (rand_accidental === '') {
                    notes = [
                        new VF.StaveNote({ clef: "treble", keys: key, duration: "8" })
                    ];
                }
                else if (rand_accidental !== '') {
                    notes = [
                        new VF.StaveNote({ clef: "treble", keys: key, duration: "8" })
                            .addAccidental(0, new VF.Accidental(rand_accidental))
                    ];
                }


            }


            VF.Formatter.FormatAndDraw(context, stave, notes);
        }

        // __change_accidental()
        __change_notes()

        __render()


    }


    const handleStart = () => {
        console.log('handleStart')
        setStarted(true)
    }

    const checkAnswer = (user_answer) => {
        console.log('checkAnswer()')
        console.log(user_answer)
        console.log(mountedQuestion)

        if (mountedQuestion === user_answer.toLowerCase()) {
            setAnswerCheck('Correct')

        }
        else if (mountedQuestion !== user_answer.toUpperCase()) {
            setAnswerCheck('Incorrect')
        }
    }


    const mountUnit = (chosen_unit) => {


        console.log(chosen_unit)


        $('#score-display > svg').html('')

        // 局部全局变量
        var key
        var rand_accidental = '#'

        function __change_notes() {

            let rand_group = Math.floor(Math.random() * groups.length)
            let rand_key = Math.floor(Math.random() * groups[rand_group].length)
            console.log('__change_notes')

            key = groups[rand_group][rand_key]
            console.log('key 198')
            console.log(key)

        }


        function __change_accidental() {
            rand_accidental = Math.floor(Math.random() * accidental.length)
        }


        function __render() {
            // Configure the rendering context.
            renderer.resize(300, 200);
            var context = renderer.getContext();
            context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

            // Create a stave of width 400 at position 10, 40 on the canvas.
            var stave = new VF.Stave(10, 40, 400);

            // Add a clef and time signature.
            stave.addClef("treble");

            // Connect it to the rendering context and draw!
            stave.setContext(context).draw();



            var notes = []

            if (typeof key === 'string') {
                notes = [
                    new VF.StaveNote({ clef: "treble", keys: [key], duration: "8" })
                    // .addAccidental(0, new VF.Accidental(rand_accidental))
                ];
            }
            else if (typeof key === 'object') {
                notes = [
                    new VF.StaveNote({ clef: "treble", keys: key, duration: "8" })
                ];
            }


            VF.Formatter.FormatAndDraw(context, stave, notes);
        }

        // __change_accidental()
        __change_notes()

        __render()


        const __octave_training = () => {
            // let groups = 
            console.log('__octave_training')
            setGroups([[keys_B],[keys_B]])
        }

        const __inteval_challenge = () => {
            // let groups = 
            console.log('__inteval_challenge')
            setGroups([inteval_2, inteval_3])
            console.log(groups)
        }


        let unit_to_mount = units_obj[chosen_unit]
        console.log(`unit_to_mount: ${unit_to_mount}`)
        setChosenUnit(unit_to_mount)

        // 用switch case的方法来执行不同的方程
        switch (unit_to_mount) {
            case 'octave_training': {
                __octave_training()
                break;
            }
            case 'inteval_challenge': {
                __inteval_challenge()
            }

            default:
                break;
        }



    }



    useEffect(() => {
        // Create an SVG renderer and attach it to the DIV element named "score-display".

        var div = document.getElementById("score-display")
        renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    }, [VF])


    return (
        <div>
            {(configStep === 1) &&
                <div>
                    <div>Units</div>

                    {units_arr.map((item, idx) => (
                        <Button variant='contained' onClick={() => mountUnit(item)}>{item}</Button>
                    ))}
                </div>
            }

            <div>
                {(configStep === 2) &&

                    <div>
                        {/* 相對應的顯示，有不同的JSS styling */}
                        {answerCheck === 'Correct' && <div style={{ color: 'green' }} id='answer-check-div'>{answerCheck}</div>}
                        {answerCheck === 'Incorrect' && <div style={{ color: 'red' }} id='answer-check-div'>{answerCheck}</div>}
                        {answerCheck === 'Choose an answer' && <div style={{ color: 'gray' }} id='answer-check-div'>{answerCheck}</div>}
                    </div>
                }

                <div id="score-display"></div>

                {(configStep === 2) &&
                    <div>
                        {answerChoices.map((item, idx) => (
                            <Button variant='contained' onClick={() => checkAnswer(item)}>{item}</Button>
                        ))}
                    </div>

                }


            </div>

            {(!startedBool && chosenUnit) && <Button variant='contained' color='primary' onClick={handleStart}>Start</Button>}
            {startedBool && <Button variant='contained' color='primary' onClick={handleNext}>Next</Button>}
        </div >
    )
}
