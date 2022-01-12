import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReactDOMServer from 'react-dom/server';


let buttonRef;

export const addButtonAnimation=(button)=>{
    buttonRef=button;
    const animateButt=button.current;
    animateButt.classList.add('animation')
}
export const removeButtonAnimation=()=>{
    const animateButt=buttonRef.current;
    console.log(buttonRef);
    animateButt.classList.remove('animation');
    animateButt.classList.toggle('isCartButt');
    animateButt.innerHTML= "View your cart"+ReactDOMServer.renderToString(<CheckCircleOutlineIcon style={{marginLeft:`10px`}} />);
    animateButt.onclick=()=>{
        console.log("woow");
    };
   
}
export const removeCartButton=()=>{
    const animateButt=buttonRef.current;
    animateButt.classList.remove('isCartButt');
    animateButt.innerHTML= "Add to cart";
    
   
}