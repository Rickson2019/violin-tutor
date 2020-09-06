import React, { Component, Fragment } from 'react';
import NotLiveRoute from 'react-live-route'
import { withRouter } from 'react-router-dom'


// Material UI buttons
import { Button, Typography } from '@material-ui/core';

// import 
import {
    Route,
    Link
} from "react-router-dom";

// Sortable
import Sortable from 'sortablejs';
// Jquery
import $ from 'jquery'
// Tone.js
import { Synth } from 'tone'




// imported pictures
import keyC from './img/keyboard - C.png'
import keyD from './img/keyboard - D.png'
import keyE from './img/keyboard - E.png'
import keyF from './img/keyboard - F.png'
import keyG from './img/keyboard - G.png'
import keyA from './img/keyboard - A.png'
import keyB from './img/keyboard - B.png'

import key_C_sharp from './img/keyboard - C#.png'
import key_D_sharp from './img/keyboard - D#.png'
import key_F_sharp from './img/keyboard - F#.png'
import key_G_sharp from './img/keyboard - G#.png'
import key_A_sharp from './img/keyboard - A#.png'






// 
const styles = {
    draggableNoteContainer : {
        display : 'grid',
        gridTemplateColumns : '50vw 50vw'
    },
    root: {
        '#button-container button': {
            marginTop: '5vh'
        }
    },
    notesDiv: {
        maxWidth: '100vw',
        minWdith: '60vw',
        fontSize: '20pt'
    },
    notesBtn: {
        width: '35px',
        maxWidth: '45px',
        minWidth: '35px'
    },

    keyImg: {
        maxHeight: '40px'
    },
    notesMounted: {
        minHeight: '15vw',
        borderStyle: 'ridge',
        fontSize: '20pt'
    },

    draggableNotes: {
        display : 'grid',
        gridTemplateColumns : '50vw 50vw'
    },
    quizConfigBtnGroup: {
        position: 'fixed',
        bottom: '5vh',
        display: 'flex',
    },
    buttonContainer: {
        // textAlign: 'center',

        // position : 'fixed',
        marginLeft: '35vw',
        marginRight: '35vw',
        marginTop: '5vh'
    },
    button: {
        marginTop: '5vh'
    },
    answerChoicesContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    answerChoices: {
        marginTop: '2vh'
    }

}

// 小提琴音域：G3——D7
const note_array_C = ['C4', 'C5', 'C6', 'C7']

const note_array_D = ['D4', 'D5', 'D6', 'D7']
const note_array_E = ['E4', 'E5', 'E6']
const note_array_F = ['F4', 'F5', 'F6']
const note_array_G = ['G3', 'G4', 'G5', 'G6']
const note_array_A = ['A3', 'A4', 'A5', 'A6']
const note_array_B = ['B3', 'B4', 'B5', 'B6']

// const note_array_C_sharp = ['C4#', 'C5#', 'C6#', 'C7#']
const note_array_C_sharp = ['C#4', 'C#5', 'C#6', 'C#7']
const note_array_D_sharp = ['D4#', 'D5#', 'D6#', 'D7#']

// mapping object for notes
const scale = {
    'C': note_array_C,
    'D': note_array_D,
    'E': note_array_E,
    'F': note_array_F,
    'G': note_array_G,
    'A': note_array_A,
    'B': note_array_B,
    'C#' : note_array_C_sharp,
    'D#' : note_array_D_sharp
}







const LiveRoute = withRouter(NotLiveRoute)




const draggableInitialization = () => {
    $(document).ready(() => {
        // The note choices
        let notesChooseable = document.getElementById('notesChooseable');
        let notesMounted = document.getElementById('notesMounted');

        // css onload
        $(notesMounted).css('display', 'flex')
        $('#notesMounted img').hide()
        // These should be gone.

        try {

            Sortable.create(notesMounted, {
                handle: '.my-handle',
                animation: 150,
                group: '.draggableNotes',
                direction: 'horizontal',
                onAdd: (e) => {
                    $('#notesMounted img').css('display', 'none')

                }
            });





            Sortable.create(notesChooseable, {
                handle: '.my-handle',
                animation: 150,
                group: '.draggableNotes',
                onAdd: (e) => {
                    console.log($('#notesChooseable img'))
                    $('#notesChooseable img').show()
                }

            });



        } catch (error) {
            console.log(error)
        }
    })
}












export default class PitchPractice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 
            question_note_name_array: [],
            // 默认时值
            play_note_duration: '4n',
            // 
            question_notes_array: [],
            pitchPracticeStep: 1
        }
    }


    componentDidMount() {

        draggableInitialization()
    }

    componentDidUpdate() {

        draggableInitialization()
    }

    // 让唱名被塞入array存放
    handleQuestionMount() {
        console.log('%chandleQuestionMount', "color:red;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold")
        console.log($('#notesMounted .note_name_question'))

        let notes_to_have_P = $('#notesMounted .note_name_question')

        let question_note_name_array = []
        $.when().then(() => {
            // 从Span中拿出这些唱名，放进一个唱名array当中
            for (var noteSPAN of notes_to_have_P) {
                console.log($(noteSPAN).html())
                let note = $(noteSPAN).html()
                question_note_name_array.push(note)
            }
        })
            .then(
                () => {
                    this.setState({ question_note_name_array: question_note_name_array })
                }
            )
            .then(
                () => {
                    let question_note_name_array = this.state.question_note_name_array
                    console.log(this.state.question_note_name_array)

                    for (var item of question_note_name_array) {
                        console.log(scale[item])

                    }
                    this.shuffleArrayOrder()
                }

            )
    }


    // 把题目洗牌
    shuffleArrayOrder() {
        console.log('%cshuffleArrayOrder', "color:red;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold")

        let question_note_name_array = this.state.question_note_name_array

        let question_array = []
        $.when()
            .then(() => {
                for (var item of question_note_name_array) {
                    console.log(scale[item])
                    // 一定要有等于号
                    question_array = question_array.concat(scale[item])
                }
            })
            .done(() => {
                console.log(question_array)
                function shuffle(array) {
                    array.sort(() => Math.random() - 0.5);
                    return array
                }
                let shuffled_array = shuffle(question_array)
                this.setState({ question_notes_array: shuffled_array })
            })



    }


    playNoteQuestion(note_name, duration) {
        console.log('%cplayNoteQuestion', "color:red;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold")
        //create a synth and connect it to the main output (your speakers)
        const synth = new Synth().toDestination();
        // alert(note_name)
        if (duration) {
            console.log(duration)

            synth.triggerAttackRelease(note_name, duration);
        }
        else {
            synth.triggerAttackRelease(note_name, '3n')
        }

    }

    // 播音
    playSound() {
        $('#showResultDiv').html('empty').css('color', 'white')
        let question_notes_array = this.state.question_notes_array
        console.log(question_notes_array)
        let item = question_notes_array[Math.floor(Math.random() * question_notes_array.length)]
        $.when().then(
            () => {
                // 把题目塞进state里
                this.setState({ mounted_question_note: item })
            }
        ).done(() => {
            console.log(`item ${this.state.mounted_question_note}`)
        })

        this.playNoteQuestion(item)
    }

    replay() {


        this.playNoteQuestion(this.state.mounted_question_note)
    }

    //检查是否答对
    checkAnswer(e) {
        // 用户的选择
        let user_answer = $(e.target).html()
        // 正确答案，是唱名的 第一个 或者 第一加第二个 字母
        let correct_answer = (this.state.mounted_question_note.length == 2 ? this.state.mounted_question_note.substring(0, 1) : (this.state.mounted_question_note.substring(0, 1) + '#'))
        console.log("%ccheckAnswer()", "color:red;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold")
        console.log(`%c${correct_answer}`, "color:blue;font-family:system-ui;font-size:0.9rem;-webkit-text-stroke: 0.05px yellow;font-weight:bold")

        if (user_answer === correct_answer) {
            console.log('%cCORRECT', "color:blue;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 0.05px yellow;font-weight:bold")
            $('#showResultDiv').html('CORRECT')
                .css("color", "blue")
                .css('font-family', 'system-ui')
                .css('font-size', '15pt')
                .css('-webkit-text-stroke', '0.05px yellow')
                .css('font-weight', 'bold')
                .css('text-align', 'center')
        }
        else {
            console.log('%cWRONGGG!!!', "color:red;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 0.05px yellow;font-weight:bold")

            $('#showResultDiv').html('WRONG!')
                .css("color", "red")
                .css('font-family', 'system-ui')
                .css('font-size', '15pt')
                .css('-webkit-text-stroke', '0.05px yellow')
                .css('font-weight', 'bold')
                .css('text-align', 'center')
        }

    }


    setStep(n) {
        this.setState({ pitchPracticeStep: n })
    }

    render() {
        return (
            <div style={styles.root}>
                {/* <LiveRoute alwaysLive={false} exact path='/pitch-practice/note-name-configuration'
                    render={(props) => ( )} /> */}

                {this.state.pitchPracticeStep == 1 && <Fragment>
                    <Typography variant='h5' component='h2' >Pitch Practice</Typography>
                    <Typography variant='body1' component='p'>These are the notes you want to be trained</Typography>


                    <div id='notesMounted' className='draggableNotes' style={styles.notesMounted}>
                        <div className='my-handle' style={styles.notesDiv} id='notesChooseable_C'><button variant='contained' className='note_name_question'>C</button> <img style={styles.keyImg} alt='keyC' src={keyC} /> </div>
                        <div className='my-handle' style={styles.notesDiv} id='notesChooseable_D'><button variant='contained' className='note_name_question'>D</button> <img style={styles.keyImg} alt='keyD' src={keyD} /> </div>
                        <div className='my-handle' style={styles.notesDiv} id='notesChooseable_E'><button variant='contained' className='note_name_question'>E</button> <img style={styles.keyImg} alt='keyE' src={keyE} /> </div>
                    </div>

                    <Typography variant='body1' component='p'>Drag these to the above list and start training!</Typography>

                    <div id='notes-chooseable-two-rows' className='draggableNotes' style={styles.draggableNoteContainer}>
                        <div id='notesChooseable' className='draggableNotes' style={styles.draggableNotes}>

                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_F'><button variant='contained' className='note_name_question' style={styles.notesBtn}>F</button> <img style={styles.keyImg} alt='keyF' src={keyF} /> </div>
                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_G'><button variant='contained' className='note_name_question' style={styles.notesBtn}>G</button> <img style={styles.keyImg} alt='keyG' src={keyG} /> </div>
                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_A'><button variant='contained' className='note_name_question' style={styles.notesBtn}>A</button> <img style={styles.keyImg} alt='keyA' src={keyA} /> </div>
                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_B'><button variant='contained' className='note_name_question' style={styles.notesBtn}>B</button> <img style={styles.keyImg} alt='keyB' src={keyB} /> </div>

                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_C#'><button variant='contained' className='note_name_question' style={styles.notesBtn}>C#</button> <img style={styles.keyImg} alt='keyC#' src={key_C_sharp} /> </div>
                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_D#'><button variant='contained' className='note_name_question' style={styles.notesBtn}>D#</button> <img style={styles.keyImg} alt='keyD#' src={key_D_sharp} /> </div>
                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_F#'><button variant='contained' className='note_name_question' style={styles.notesBtn}>F#</button> <img style={styles.keyImg} alt='keyF#' src={key_F_sharp} /> </div>
                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_G#'><button variant='contained' className='note_name_question' style={styles.notesBtn}>G#</button> <img style={styles.keyImg} alt='keyG#' src={key_G_sharp} /> </div>
                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_A#'><button variant='contained' className='note_name_question' style={styles.notesBtn}>A#</button> <img style={styles.keyImg} alt='keyA#' src={key_A_sharp} /> </div>
                        </div>

                        {/* <div id='notesChooseable' className='draggableNotes' style={styles.draggableNotes}>
                            
                        </div> */}
                    </div>



                    <div id='button-container'>
                        <Link to='/pitch-practice/note-duration-configuration' style={{ textDecoration: 'none', position: 'relative', bottom: '0px' }}>
                            <Button style={styles.buttonContainer} variant='contained' color='primary' onClick={() => { this.handleQuestionMount(); this.setStep(2) }}>Next</Button>
                        </Link>
                    </div>

                </Fragment>}




                {/* <Route path='/pitch-practice/note-duration-configuration'> </Route>*/}

                {this.state.pitchPracticeStep === 2 && <div id='button-container' style={styles.buttonContainer}>
                    <Link to='/pitch-practice/note-name-configuration' style={{ textDecoration: 'none' }}><Button variant='outlined' color='primary' onClick={() => { this.setStep(this.state.pitchPracticeStep - 1) }}>Back</Button></Link>
                    <Link to='/pitch-practice/quiz' style={{ textDecoration: 'none' }}><Button variant='contained' color='primary' onClick={() => { this.playSound(); this.setStep(3) }} >Start</Button></Link>
                </div>}




                {/* <Route exact path='/pitch-practice/quiz'>    </Route>*/}

                {this.state.pitchPracticeStep === 3 &&

                    <Fragment>
                        <div id='showResultDiv'></div>

                        <div>
                            <div onLoad={() => { this.playSound(); console.log('onLoad') }}></div>
                        </div>

                        <div id='answer-choices' style={styles.answerChoicesContainer}>
                            {/* 把生成的Button塞进div里，每个note一个Button */}
                            {this.state.question_note_name_array.map((note, index) => (
                                <Button style={styles.answerChoices} variant='outlined' key={index} onClick={(e) => this.checkAnswer(e)}>{note}</Button>
                            ))
                            }
                        </div>



                        <div id='button-container' style={styles.buttonContainer}>
                            {/* play the beep sound */}

                            <Button variant='contained' onClick={() => this.replay()}>Replay</Button>

                            <Button variant='contained' color='primary' onClick={() => this.playSound()}>Next</Button>
                        </div>


                        <div style={styles.quizConfigBtnGroup}>
                            <Button variant='outlined' color='primary' onClick={() => this.setStep(1)} style={styles.button}>Change Note Name</Button>
                            <Button variant='outlined' color='primary' onClick={() => this.setStep(2)} style={styles.button}>Change Duration</Button>
                        </div>

                    </Fragment>}




            </div>
        )
    }
}
