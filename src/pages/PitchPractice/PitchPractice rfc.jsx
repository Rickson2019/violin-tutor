import React, { Component, Fragment,useState } from 'react';
import NotLiveRoute from 'react-live-route'
import { withRouter } from 'react-router-dom'


// Material UI buttons
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
import LiveRoute from 'react-live-route';

// 
const styles =  {
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

    },
    quizConfigBtnGroup: {
        position: 'fixed',
        bottom: '5vh'
    }
}



export default function PitchPractice() {

    // question note name hook
    const [question_note_name_array, set_question_note_name_array] = useState([])

    const handleQuestionMount =() => {
        console.log('%chandleQuestionMount',"color:red;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold")
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
                    set_question_note_name_array(question_note_name_array)
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




    return (
        <div>
            <LiveRoute alwaysLive={true} exact path='/pitch-practice/note-name-configuration' alwaysLive={true}
                render={(props) => (
                    <Fragment>
                        <Typography variant='h5' component='h2' >Pitch Practice</Typography>
                        <Typography variant='body1' component='p'>These are the notes you want to be trained</Typography>


                        <div id='notesMounted' className='draggableNotes' style={styles.notesMounted}>
                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_C'><button variant='contained' className='note_name_question'>C</button> <img style={styles.keyImg} alt='keyC' src={keyC} /> </div>
                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_D'><button variant='contained' className='note_name_question'>D</button> <img style={styles.keyImg} alt='keyD' src={keyD} /> </div>
                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_E'><button variant='contained' className='note_name_question'>E</button> <img style={styles.keyImg} alt='keyE' src={keyE} /> </div>
                        </div>

                        <Typography variant='body1' component='p'>Drag these to the above list and start training!</Typography>

                        <div id='notesChooseable' className='draggableNotes' style={styles.draggableNotes}>

                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_F'><button variant='contained' className='note_name_question' style={styles.notesBtn}>F</button> <img style={styles.keyImg} alt='keyF' src={keyF} /> </div>
                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_G'><button variant='contained' className='note_name_question' style={styles.notesBtn}>G</button> <img style={styles.keyImg} alt='keyG' src={keyG} /> </div>
                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_A'><button variant='contained' className='note_name_question' style={styles.notesBtn}>A</button> <img style={styles.keyImg} alt='keyA' src={keyA} /> </div>
                            <div className='my-handle' style={styles.notesDiv} id='notesChooseable_B'><button variant='contained' className='note_name_question' style={styles.notesBtn}>B</button> <img style={styles.keyImg} alt='keyB' src={keyB} /> </div>
                        </div>
                        <Link to='/pitch-practice/note-duration-configuration' style={{ textDecoration: 'none' }}><Button variant='contained' color='primary' onClick={handleQuestionMount}>Next</Button></Link>

                    </Fragment>
                )} />



            <Route path='/pitch-practice/note-duration-configuration'>


                <div >
                    <Link to='/pitch-practice/note-name-configuration' style={{ textDecoration: 'none' }}><Button variant='outlined' color='primary'>Back</Button></Link>
                    <Link to='/pitch-practice/quiz' style={{ textDecoration: 'none' }}><Button variant='contained' color='primary' >Start</Button></Link>
                </div>
            </Route>


            <Route path='/pitch-practice/quiz'>

                <div id='showResultDiv'></div>    
                <div >
                    <div onLoad={() => {this.playSound();console.log('onLoad')}}></div>
                    {/* play the beep sound */}
                    <Button onClick={() => this.playSound()}>play</Button>
                </div>

                <div id=''>
                    {/* 把生成的Button塞进div里，每个note一个Button */}
                    {question_note_name_array.map((note, index) => (
                        <button key={index} onClick={(e)=>this.checkAnswer(e)}>{note}</button>
                    ))
                    }
                </div>
                <div style={styles.quizConfigBtnGroup}>
                    <Link to='/pitch-practice/note-name-configuration' style={{ textDecoration: 'none' }}><Button variant='outlined' color='primary' >Change Note Name</Button></Link>
                    <Link to='/pitch-practice/note-duration-configuration' style={{ textDecoration: 'none' }}><Button variant='outlined' color='primary' >Change Duration</Button></Link>
                </div>
            </Route>
        </div>
        )

}
