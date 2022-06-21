import logo from './logo.svg';
import './App.css';
import './style.css';
import { useState } from 'react';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
import { createStore } from 'redux';
// 각각 컴포넌트, 어떤 state값을 쓰고 싶은지 선택하는 것, useState값을 변경시킬 때 쓰는 것, connect(사용하기 좀 어려움.. 사용 지양할 것)
// Provider : useState를 어떤 컴포넌트에게 제공할 것인가? 를 정의하는 것.

function reducer(currentState, action) {
  // store에 있는 state를 어떻게 바꿀 것인가? 를 결정하는 곳
  
  // redux는 각각의 state를 불변하게 유지해야한다.
  // 그 방법은 새로운 state를 만들고 과거의 state를 거기에 복제하면 된다.

  if(currentState === undefined) {
    return {
      number:1
    }
  }
  const newState = {...currentState};
  // 이렇게 하면 불변성을 유지할 수 있다.

  if(action.type === 'PLUS') {
    newState.number++;
  }

  return newState;
}
const store = createStore(reducer);

export default function App() {

  const [number, setNumber] = useState(1);

  return (
    <div id="container">
      <h1>Root</h1>
      <div id="grid">
        <Provider store={store}>
          <Left1></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div>
  );
}

function Left1(props) {
  return (
    <div>
      <h1>Left1 : </h1>
      <Left2></Left2>
    </div>
  )
}

function Left2(props) {
  console.log('2');
  return (
    <div>
      <h1>Left2 : </h1>
      <Left3></Left3>
    </div>
  )
}

function Left3(props) {
  console.log('3');         // + 버튼 누를 때마다 state를 사용하고 있는 number의 값이 바뀐다는 것을 의미한다.
  const number = useSelector((state)=> state.number);
  return (
    <div>
      <h1>Left3 : {number}</h1>
    </div>
  )
}

function Right1(props) {
  return (
    <div>
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  )
}

function Right2(props) {
  return (
    <div>
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  )
}

function Right3(props) {
  // useState를 변경할 때 쓰는 dispatch를 가져와야한다.
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Right3</h1>
      <input type="button" value="+" onClick={() => {
        dispatch({type:'PLUS'});      // type은 PLUS라고 하는 action을 줄 것이다.
      }}></input>
    </div>
  )
}
