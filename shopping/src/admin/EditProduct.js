import React,{useState,useRef,useEffect} from 'react'
import styled,{keyframes} from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router';
import axios from "axios"
import Resizer from "react-image-file-resizer";

function EditProduct(props) {
 
    const[product,setProduct]=useState({name:"",category:"",brand:"", description:"" ,quantity:null, price:null , discount:null , images:[]});
    // const changeRef=useRef();
    const history= useHistory();
    let items,value;
    const handleInput=(e)=>{
        items=e.target.name;
        value=e.target.value;
        setProduct({...product,[items]:value});
    }
    

    const getAllInfo=()=>{
        axios.get('https://bhoomihillsnaturalsbackend.herokuapp.com/edit/'+props.match.params.id).then(res=>{
            if(res.status===200)
            {
                setProduct(res.data);
            }
        }).catch(err=>{
            console.log(err.message);
        })

    }
    const uploadImage=async(e)=>{
        const allImages=[];
        for (var i = 0; i < e.target.files.length; i++) {
            
            const base64=await resizeFile(e.target.files[i]);
            allImages.push(base64);
        }
        setProduct((product)=>({...product,images:allImages}));
    }
    

    //Converting the image to base64 and resizing

    const resizeFile = (file) =>{
    return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      768,
      768,
      "jpeg",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  })}

//   const Close=()=>{
//     history.push("/products");
//   }
const close=()=>
    {history.push('/products');}
   
    const postData=(e)=>{
        e.preventDefault();
        axios.post('https://bhoomihillsnaturalsbackend.herokuapp.com/edit/'+props.match.params.id,product).then(res=>{
            if(res.status===200)
            {
                alert("product updated successfully");
                history.push("/products");
            }
            else if(res.status===401) 
            {
                alert("Please upload the image ");
            }
        }).catch(err=>{
            console.log(err.message);
        })
        }
    
        useEffect(() => {
            getAllInfo();
        }, [])

    return (
        <>
            <Overlay></Overlay>
        <ModalContainer>
            <Close>
                <div>
                    <h2>Add Product</h2>
                </div>
                <div>
                <button onClick={close} >
                <CloseIcon />
                <span>close</span></button>
                </div>
                
            </Close>
            
            <Formgroup>
            <form method="POST" id="eventForm" encType="multipart/form-data" >
                <TopContainer>
                            <div>
                            <input value={product.name}  onChange={handleInput} placeholder="Enter Product name"  type="text" autoComplete="off" id="eventName" name="name"/><br/>
                            <input value={product.category} onChange={handleInput} type='text' placeholder='Enter category' name="category"    ></input>
                            <input value={product.brand} onChange={handleInput} type='text' placeholder='Enter Brand' name="brand"    ></input>
                            <input value={product.price} onChange={handleInput} type='number' placeholder='Enter Price' name="price"    ></input>
                            <input value={product.quantity} onChange={handleInput} type='number' placeholder='Enter Total Quantity' name="quantity"    ></input>
                            <input value={product.discount} onChange={handleInput} type='number' placeholder='Enter Discount' name="discount"    ></input>
                           
                           </div>
                           <div>
                               <label>Choose an event image :</label>
                               <input accept="image/*" multiple="multiple" className="upload-butt" type="file" name="file" onChange={uploadImage} />
                               <textarea rows="12" cols="50" spellCheck="false" minLength="10" maxLength = "850" value={product.description} onChange={handleInput} placeholder="Write Product's description...."  id="eventDes" name="description" />
                           </div>
                           <div>
                           </div>
                           </TopContainer>
                           

                           
                            <button type="submit" value="Login" onClick={postData} ><span>Add Product</span> </button>
                           
                        </form>

            </Formgroup>
        </ModalContainer>
        </>
    )
}

export default EditProduct
const BottomContainer=styled.div`
width:700px;
height:auto;
@media (max-width : 480px) {
    width:100%;

}
`


const TopContainer=styled.div`
height:350px;
display:flex;
width:700px;
@media (max-width : 480px) {
 
    width:auto;
 flex-direction:column;
 height:200px;            
}

`


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;


const LoadingFrame=styled.div`
content:"";
width:15px;
height:15px;
border:2px solid black;
border:5px solid transparent;
border-top-color:#ffffff;
border-radius:50%;
animation:${rotate} 1s ease infinite;

`


const Close=styled.div`
display:flex;
justify-content:space-between;
align-items:center;
height:45px;
@media (max-width : 480px) {
     h2{
         font-size:20px;

     }           
}

`
const ModalContainer=styled.div`
position:fixed;

      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
        background-color:#FFF;
        
        padding:10px;
        height:500px;
        width:750px;
        border-radius:7px;
        border:none;
        z-index:1000;

        button{
            display:flex;
            align-items:center;
            cursor:pointer;
            background-color:white;
            border-radius:5px;

        }

        @media (max-width : 480px) {
            width:90%;
            height:550px;
            margin:0px;
            overflow-y: scroll;
            
                }
`

const Overlay=styled.div`
position:fixed;
top:0;
bottom:0;
right:0;
left:0;
background-color:rgba(0,0,0,.7);
z-index:1000;
`
const Formgroup=styled.div`
span{
    padding:3px;
    font-size:17px;
}

width:380px;
padding:25px;
input{
    resize: none;
    padding:10px;
    margin:7px;
    border-radius:7px;
    font-size:15px;
    width:320px;
    outline: 0;
   
    border-color: black;
    ::placeholder {
        font-size: 15px;
        color: grey;
      }
     
   
}
textarea{    
    resize: none;
    padding:10px;
    margin:5px;
    border:1px solid black;
    border-radius:7px;
    font-size:16px;
    width:320px;
    outline: 0;

}
[placeholder]:focus::-webkit-input-placeholder {
    transition: text-indent 0.2s 0.2s ease; 
    text-indent: -100%;
    opacity: 1;
  
 }
 
input:focus {
    border-color: blue;

    
  }
  textarea:focus {
    border-color: blue;
    
  }
label{
    color:black;
    margin-left:12px;
    display:inline-block;
}
button{
    display:flex;
    align-items:center;
    justify-content:center;
    width:250px;
    padding:7px;
    font-size:17px;
    background:white;
    cursor:pointer;
    border:none;
    color:white;
    margin-left:30px;
    margin-top:10px;
    border-radius:20px;
    background-image: linear-gradient(to right,#0000FF, #0080FF);

}
button:hover{
    background:#0059b3;
}
@media (max-width : 480px) {
           
 width:auto;
    margin:2px;
    margin-right:0px;
    padding:5px;
    input{
        margin:7px;
        width:90%;
       
    }
    button{
        margin-left:0px;
    }
    textarea{
        width:90%;
        margin:7px;
    }


}

`