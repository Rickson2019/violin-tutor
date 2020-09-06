import React, { useEffect, useState } from 'react'
// import { Score } from 'react-vexflow'
import $ from 'jquery'
import vexflow from 'vexflow';
import { Button } from '@material-ui/core'

const VF = vexflow.Flow;
var renderer

// 数据
var keys_3 = ['g/3', 'a/3', 'b/3']
var keys_4 = ["c/4", "d/4", "e/4", 'f/4', 'g/4', 'a/4', 'b/4']
var keys_5 = ["c/5", "d/5", "e/5", 'f/5', 'g/5', 'a/5', 'b/5']
var keys_6 = ["c/6", "d/6", "e/6", 'f/6', 'g/6', 'a/6', 'b/6']
var keys_7 = ["c/7", "d/7"]

var accidental = ['', '#', 'b']


var groups = [keys_3, keys_4, keys_5, keys_6, keys_7]

var answers = ['C', 'D', 'E', 'F', 'G', 'A', 'B']




export default function NoteReading() {

    const [mountedQuestion, mountQuestion] = useState('')

    const [choices, setChoices] = useState([''])

    const [answerCheck, setAnswerCheck] = useState('Choose an answer')

    const handleClick = () => {

        $('#boo > svg').html('')

        // 局部全局变量
        var key
        var rand_accidental = '#'

        function __change_notes() {

            let rand_group = Math.floor(Math.random() * groups.length)
            let rand_key = Math.floor(Math.random() * groups[rand_group].length)
            console.log('__change_notes')

            key = groups[rand_group][rand_key]
            mountQuestion(key.substring(0, 1))
        }

        // function __change_notes(){

        //     let rand_group = Math.floor(Math.random()*groups.length)
        //     let rand_key = Math.floor(Math.random()*groups[rand_group].length)
        //     console.log('__change_notes')

        //     key = groups[rand_group][rand_key]
        // }

        function __change_accidental() {

            rand_accidental = Math.floor(Math.random() * accidental.length)


        }
        // __change_accidental()
        __change_notes()


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


        var notes = [

            new VF.StaveNote({ clef: "treble", keys: [key], duration: "8" })
            // .addAccidental(0, new VF.Accidental(rand_accidental))
        ];

        VF.Formatter.FormatAndDraw(context, stave, notes);
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


    useEffect(() => {
        // Create an SVG renderer and attach it to the DIV element named "boo".
        var div = document.getElementById("boo")
        renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    }, [VF])


    return (
        <div>
            {/* 相對應的顯示，有不同的JSS styling */}
            {answerCheck === 'Correct' && <div style={{ color: 'green' }} id='answer-check-div'>{answerCheck}</div>}
            {answerCheck === 'Incorrect' && <div style={{ color: 'red' }} id='answer-check-div'>{answerCheck}</div>}
            {answerCheck === 'Choose an answer' && <div style={{ color: 'gray' }} id='answer-check-div'>{answerCheck}</div>}

            <div id="boo"></div>

            <div>
                {answers.map((item, idx) => (
                    <Button variant='contained' onClick={() => checkAnswer(item)}>{item}</Button>
                ))}   
            </div>

            <Button variant='contained' color='primary' onClick={handleClick}>Next</Button>
        </div>
    )
}
