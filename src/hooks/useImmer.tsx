


import { useState } from 'react';
import {current, produce,freeze} from 'immer';

export function useImmer<T>(initialValue:T) {
  const [state, setState] = useState(initialValue);

  const setImmerState = (updater:(draft:T)=>void|T)=>{
    setState(currentSate=>produce(currentSate,updater))
  }

  return [state, setImmerState] as const;
}
