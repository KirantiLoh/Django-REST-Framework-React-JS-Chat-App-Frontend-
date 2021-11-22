import React from 'react'
import { useRef } from 'react'

const Emojis = () => {

    let emojisRef = useRef()

    let addEmojiToChat = (emoji) => {
        let input_field = document.querySelector('#id_message')
        input_field.value += emoji
    }

    return (
        <div className="emojis" ref={emojisRef}>
                    <span onClick={() => addEmojiToChat('😀')}>😀</span>
                    <span onClick={() => addEmojiToChat('😃')}>😃</span>
                    <span onClick={() => addEmojiToChat('😄')}>😄</span>
                    <span onClick={() => addEmojiToChat('😁')}>😁</span>
                    <span onClick={() => addEmojiToChat('😆')}>😆</span>
                    <span onClick={() => addEmojiToChat('😅')}>😅</span>
                    <span onClick={() => addEmojiToChat('😂')}>😂</span>
                    <span onClick={() => addEmojiToChat('🤣')}>🤣</span>
                    <span onClick={() => addEmojiToChat('😊')}>😊</span>
                    <span onClick={() => addEmojiToChat('🙂')}>🙂</span>
                    <span onClick={() => addEmojiToChat('🙃')}>🙃</span>
                    <span onClick={() => addEmojiToChat('😉')}>😉</span>
                    <span onClick={() => addEmojiToChat('😌')}>😌</span>
                    <span onClick={() => addEmojiToChat('😍')}>😍</span>
                    <span onClick={() => addEmojiToChat('🥰')}>🥰</span>
                    <span onClick={() => addEmojiToChat('😘')}>😘</span>
                    <span onClick={() => addEmojiToChat('😗')}>😗</span>
                    <span onClick={() => addEmojiToChat('😙')}>😙</span>
                    <span onClick={() => addEmojiToChat('😚')}>😚</span>
                    <span onClick={() => addEmojiToChat('😋')}>😋</span>
                    <span onClick={() => addEmojiToChat('😛')}>😛</span>
                    <span onClick={() => addEmojiToChat('😝')}>😝</span>
                    <span onClick={() => addEmojiToChat('😜')}>😜</span>
                    <span onClick={() => addEmojiToChat('🤪')}>🤪</span>
                    <span onClick={() => addEmojiToChat('🤨')}>🤨</span>
                    <span onClick={() => addEmojiToChat('😎')}>😎</span>
                    <span onClick={() => addEmojiToChat('😏')}>😏</span>
                    <span onClick={() => addEmojiToChat('😒')}>😒</span>
                    <span onClick={() => addEmojiToChat('😞')}>😞</span>
                    <span onClick={() => addEmojiToChat('😔')}>😔</span>
                    <span onClick={() => addEmojiToChat('😟')}>😟</span>
                    <span onClick={() => addEmojiToChat('😕')}>😕</span>
                    <span onClick={() => addEmojiToChat('🙁')}>🙁</span>
                    <span onClick={() => addEmojiToChat('☹️')}>☹️</span>
                    <span onClick={() => addEmojiToChat('😢')}>😢</span>
                    <span onClick={() => addEmojiToChat('😭')}>😭</span>
                    <span onClick={() => addEmojiToChat('😠')}>😠</span>
                    <span onClick={() => addEmojiToChat('😳')}>😳</span>
                    <span onClick={() => addEmojiToChat('😱')}>😱</span>
                    <span onClick={() => addEmojiToChat('😨')}>😨</span>
                    <span onClick={() => addEmojiToChat('😰')}>😰</span>
                    <span onClick={() => addEmojiToChat('😥')}>😥</span>
                    <span onClick={() => addEmojiToChat('😓')}>😓</span>
                    <span onClick={() => addEmojiToChat('🤗')}>🤗</span>
                    <span onClick={() => addEmojiToChat('🤔')}>🤔</span>
                    <span onClick={() => addEmojiToChat('🗿')}>🗿</span>
        </div>
    )
}

export default Emojis
