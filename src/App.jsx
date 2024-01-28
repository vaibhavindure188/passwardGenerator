import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [passward, setPassward] = useState('');
  const [isnumber, setIsnumber] = useState(false);
  const [ischar , setIschar] = useState(false);
  const [length, setLenght] = useState(6);
  const passwardRef = useRef(null);

  const getPassward = useCallback(() =>{
    let p = document.getElementById('p');

    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(isnumber) str += '0123456789';
    if(ischar)  str += '/*-+@#%^&=';

    for(let i =0;i<length;i++){
      let char = Math.floor(Math.random() * str.length + 1 );  // imp note str.length is range till that range it will generate passward
      pass += str.charAt(char);
    }
    setPassward(pass);
  } , [length, ischar, isnumber]);

  useEffect(()=>{
    getPassward();
  },[length, ischar, isnumber]);

  const coptyTextToClipboard = () =>{
    window.navigator.clipboard.writeText(passward);
    passwardRef.current?.select();
  }

  
  return (
    <div >
     <h1 className='bg-red-100 text-center items-center' style={{width:"300px" , marginLeft:'500px', fontSize:'30px', border:"2px solid black" ,color:'gray', borderRadius:'3px' }}>passward Generator</h1>
     <button onClick={getPassward} style={{marginTop:'40px', backgroundColor:"green" ,marginLeft:'40px', height:'30px', width:'15%', border:'2px solid back',borderRadius:'30%', transition:' hover{backgroundColor:"red" }' }}>create passward</button>
     <div style={{display:'flex'}}>
      <input type='text' ref={passwardRef} className='  py-1 px-3' placeholder='passward' value={passward} readOnly style={{width:"300px" , marginLeft:'40%' , marginTop:'20px', color:'blue'}}></input>
      <button onClick={coptyTextToClipboard} className='bg-blue-300' style={{height:'40px' , width:'40px' , marginTop:'20px'}}>copy</button>
     </div>

     <div className=' ml-72 bg-white mt-20 mb p-10'>
      <div style={{display:'flex'}}>
      <input 
       type='range'
       min={6}
       max={100}
       className='cursor-pointer '
       value={length}
       onChange={(e)=>setLenght(e.target.value)}
       ></input>
      <h1 style={{color:'red', marginLeft:'10px', paddingRight:'30px' }}>Lenght : {length}</h1>
      </div>
      <input type='number' min={6} placeholder='enter_length' onChange={(e)=>setLenght(e.target.value)} value={length} style={{backgroundColor:'pink', textAlign:'center'}}></input>
     </div>

     <div className=' ml-72 bg-red-100 mt-20  p-5'>
      <input 
       type='checkbox'
       defaultChecked={isnumber}
       onChange={
        // (e)=> setIsnumber(!e.target.value)    this does not work
        ()=>{   setIsnumber((pre) =>!pre)     }
        }
       ></input>
       <label >number allowed</label>
     </div>

     <div className=' ml-72 bg-red-100 mt-20  p-5'>
      <input 
       type='checkbox'
       defaultChecked={ischar}
       onChange={
        // (e)=> setIsnumber(!e.target.value)
        ()=>{setIschar((pre) => !pre)}
        }
       ></input>
       <label >character allowed</label>
       <p id='p'></p>
     </div>

     
    </div>
  )
}

export default App
