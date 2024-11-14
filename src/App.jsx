import { useState,useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length,setLength]=useState(8);
  const [numAllowed,setNumAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("")

  const passwordRef=useRef(null);
  
  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed)str+="0123456789";
    if(charAllowed)str+="!@#$%^&*-_+=[]{}~`";
    for (let i = 0; i < length; i++) {
      const index=Math.floor(Math.random() * (str.length));
      pass+=str.charAt(index);
    }
    setPassword(pass);
  },[length,numAllowed,charAllowed,setPassword])

  const copyPassword=useCallback(()=>{
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,10);
      window.navigator.clipboard.writeText(password);
  },[password])
  
  useEffect(()=>{
    passwordGenerator();
  },[length,numAllowed,charAllowed,passwordGenerator]);   
  return (
    <> 
      <div className='max-w-md mx-auto p-4 my-10 text-orange-500 bg-gray-600 rounded-md'>
        <h1 className='text-2xl text-center text-white'>Password Generator</h1>
        <div className='flex gap-1'>
          <input type="text" value={password} placeholder='password' className='outline-none w-full rounded-md py-2 px-3' readOnly ref={passwordRef}/>
          <button className='bg-blue-600 text-white rounded-md px-3 py-2 cursor-pointer hover:bg-blue-500' onClick={copyPassword}>Copy</button>
        </div>
        <div className='flex items-center justify-center gap-2 mt-2'>
          <input className='cursor-pointer' type="range" min={8} max={100} onChange={(e)=>{setLength(e.target.value)}}/><label>Length:{length}</label>
          <input className='cursor-pointer' type="checkbox" defaultChecked={numAllowed} onChange={()=>{setNumAllowed((prev)=>!prev)}}/><label>Numbers</label>
          <input className='cursor-pointer' type="checkbox" defaultChecked={charAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}}/><label>Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
