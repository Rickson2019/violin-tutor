import React, { useEffect, useState, Fragment } from 'react'
import $ from 'jquery'
import {Button} from '@material-ui/core'

// import axios from 'axios'
// var music_symbols = require('./data/music_symbols')3.
var music_symbols = require('./data/music_symbols').music_symbols

export default function MusicSymbols() {

    // const [questionRecords, setQuestionRecords] = useState('')

    // 把问题装上渲染器
    const [mountedQuestion, mountQuestion] = useState('')

    const [choices, setChoices] = useState([''])

    const [answerCheck,SetAnswerCheck] = useState('')

    const [quizStartedBool,setQuizStart] = useState(false)

    // const music_symbols_question_history = await axios.post(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/music_symbols_question_history`, {
    //     email : user.email
    // })

    // const loadQuestionHistory = (question_obj) => {
    //     question_obj
    // }

    const mountQuestions = () => {
        SetAnswerCheck('Choose an answer')
        let rand = Math.floor(Math.random() * music_symbols.length);
        let question = music_symbols[rand]
        console.log(music_symbols[rand])
        $.when()
            .done(()=>mountQuestion(question))
            .done(() => {
                mountChoices()
            })


    }

    const mountChoices = () => {
        let choices = [mountedQuestion.name]
        let rand;
        let random_choice

        const get_random_choice = () => {
            console.log('get_random_choice')
            rand = Math.floor(Math.random() * music_symbols.length);
            random_choice = music_symbols[rand].name
            console.log(random_choice)
        }


        let push_choices = () => {
            $.when()
                .then(() => {
                    get_random_choice()
                })
                .then(() => {

                    while (choices.length < 4) {
                        console.log('inside while')
                        if (choices.includes(random_choice)) {
                            get_random_choice()
                        }
                        else if (random_choice) {
                            console.log(random_choice)
                            choices.push(random_choice)
                            console.log(choices)
                        }
                    }

                })
                .then(() => {
                    for (let i = choices.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * i)
                        const temp = choices[i]
                        choices[i] = choices[j]
                        choices[j] = temp
                    }
                })
                .then(() => {
                    setChoices(choices)
                })

        }
        push_choices()


    }


    const checkAnswers = (user_answer) => {
        console.log("checkAnswers")
        console.log(user_answer)
        if(user_answer === mountedQuestion.name){
            console.log('correct')
            SetAnswerCheck('Correct')
        }
        else if(user_answer !== mountedQuestion.name){
            console.log('incorrect')
            SetAnswerCheck('Incorrect')

        }
    }

    const startQuiz =() =>{
        console.log('quiz started')
        mountChoices()
        setQuizStart(true)
        
    }

    useEffect(() => {
        // loadQuestionHistory(music_symbols_question_history.data)
        console.log('%cmusic_symbols_mounted', "color:red;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold")
        console.log(music_symbols)

        mountQuestions()
        mountChoices()
        // console.log(mountChoices())
    }, [music_symbols])




    return (
        <div>
            {/* 相對應的顯示，有不同的JSS styling */}
            {answerCheck === 'Correct' && <div style={{color : 'green'}} id='answer-check-div'>{answerCheck}</div>}   
            {answerCheck === 'Incorrect' && <div style={{color : 'red'}} id='answer-check-div'>{answerCheck}</div>}
            {answerCheck === 'Choose an answer' && <div style={{color : 'gray'}} id='answer-check-div'>{answerCheck}</div>}

            {quizStartedBool  &&
                <Fragment>
                    <img id='symbol-display' src={mountedQuestion.image} />
                    <div>{mountedQuestion.name}</div>
                    {choices.map((item, idx) => (
                        <Fragment>
                            <button onClick={()=>checkAnswers(item)}>{item}</button>
                        </Fragment>
                    ))}
                </Fragment>}

                {!quizStartedBool && <Button variant='contained' color='primary' onClick={startQuiz}>Start</Button>}  
                {quizStartedBool && <Button variant='contained' color='primary' onClick={mountQuestions}>Next</Button>}  
        </div>
    )
}
