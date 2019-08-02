import React from 'react';
import { Icon } from 'native-base'
import { StyleSheet, Text, View, TouchableOpacity,TextInput, Dimensions } from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';



export default class App extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
     inputString:"",     
    }
  }

  
  checkPrecendence = (ch) =>{
    switch(ch)
    {
      case '+':
      case '-': return 1;
      case '*': 
      case '/': return 2;
      case '^': return 3;      
    }
    return -1;
  } 

  // Maintaininig an Operand and Operator stack

  calculate = (input) => {

    let number='';
    let numbers=[], n=0;
    let operator=[];
    for (let i=0; i<input.length; i++)
    {
       let ch = input.charAt(i);
       if(!isNaN(ch))
       {
          number+=ch;
       }
       else{
             numbers[n++]=eval(number);
             number='';
            while(operator.length>0 && this.checkPrecendence(ch) <= this.checkPrecendence(operator[operator.length-1]) )
            {
                 numbers[n++]=operator.pop();
            }
       }      
    }
  }
  
  updateInputString =(val) =>{
    let inputString  =  this.state.inputString;
    let last_char=inputString.charAt(inputString.length);
   
    if(inputString=="Invalid Input" || inputString=="Infinity") // to get rid of text in case of invalid string and infinity
    {
      inputString="";
    }


    if(isNaN(inputString.charAt(inputString.length-1)) && isNaN(val))    // if the last element in the string is an operator and user clicks another operator the entry is not accepted
    {
      inputString=inputString.slice(0,inputString.length-1)+val;
      this.setState({inputString});
    }
    else{
      inputString+=val;
      this.setState({inputString});
    } 
  }

  resetDisplay = () =>{
    this.setState({inputString:''});
  }

  displayAnswer = () => {
    let string = this.state.inputString;  
    let answer;
    // console.log(answer);

    try{
      if(string.charAt(0)!="√")
      {     
         answer = eval(string);
      }else
      {
        answer=string.slice(1,string.length);
        answer=Math.sqrt(eval(answer));
        console.log(answer);
      }

     if(answer!=undefined)
     {     
    //  console.log(answer);
       if(answer%1>0)   // to check it the number after decimal is greater than zero/check if decimal value is present or not
       {
         answer=answer.toFixed(2);
       }
      this.setState({inputString:answer.toString()});
     }
   }
  catch(err)
  {
    this.setState({inputString:"Invalid Input"});
    console.log(err);
  }
   
  }

  backSpace = () =>{
    let inputString=this.state.inputString;
    if(inputString=="Invalid Input" || inputString=="Infinity") // to get rid of text in case of invalid string and infinity
    {
      inputString="";
    }
    else{
    inputString = inputString.substring(0,inputString.length-1);}
    this.setState({inputString});    
  }



  render(){
  return (
    <View style={styles.container}>

     <View style={styles.displayScreen}>
     <TextInput
     style={styles.displayInput}
     multiline={true}    
     editable={false}
     maxlength={15}
     value={this.state.inputString}     
     placeholder="0"
     placeholderTextColor="#fff"
     />


     </View>           

        <View style={styles.gridContainer}>
        
        <View style={styles.rowContainer}>
         <TouchableOpacity
         onPress={()=>{
          this.updateInputString("%");           
         }}
         style={styles.button}
         >         
         <Text style={styles.buttonText}>Mod</Text>
         </TouchableOpacity>
        
        <TouchableOpacity
         onPress={()=>{
             this.resetDisplay();
         }}
         style={styles.button}
         >         
         <Text style={styles.buttonText}>C</Text>
         </TouchableOpacity>
        
         <TouchableOpacity
         onPress={()=>{
          this.backSpace();
         }}
         style={styles.button}
         >         
         <Text style={styles.buttonText}>
         <Icon name="backspace" style={{color:"#fff"}}></Icon>
         </Text>
         </TouchableOpacity>
         
         <TouchableOpacity
         onPress={()=>{
          this.updateInputString("/");           
         }}
         style={styles.specialButton}
         >
         <Text style={[styles.buttonText]}>/</Text>         
         </TouchableOpacity>

        </View> 


     
        <View style={styles.rowContainer}>
         <TouchableOpacity
         onPress={()=>{
          this.updateInputString("7");           
         }}
         style={styles.button}
         >         
         <Text style={styles.buttonText}>7</Text>
         </TouchableOpacity>
        
        <TouchableOpacity
         onPress={()=>{
          this.updateInputString("8");           
         }}
         style={styles.button}
         >         
         <Text style={styles.buttonText}>8</Text>
         </TouchableOpacity>
        
         <TouchableOpacity
         onPress={()=>{
          this.updateInputString("9");           
         }}
         style={styles.button}
         >         
         <Text style={styles.buttonText}>9</Text>
         </TouchableOpacity>
         
         <TouchableOpacity
         onPress={()=>{
          this.updateInputString("*");           
         }}
         style={styles.specialButton}
         >
         <Text style={styles.buttonText}>
         <Icon name="close" style={[{color:"#fff"}]}></Icon></Text>         
         </TouchableOpacity>

        </View>
     
        

        <View style={styles.rowContainer}>
        <TouchableOpacity
        onPress={()=>{
          this.updateInputString("4");           
        }}
        style={styles.button}
        >         
        <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
       
       <TouchableOpacity
        onPress={()=>{
          this.updateInputString("5");           
        }}
        style={styles.button}
        >         
        <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
       
        <TouchableOpacity
        onPress={()=>{
          this.updateInputString("6");           
        }}
        style={styles.button}
        >         
        <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
        onPress={()=>{
          this.updateInputString("-");           
        }}
        style={styles.specialButton}
        >
        <Text style={[styles.buttonText]}>-</Text>         
        </TouchableOpacity>

       </View>

        <View style={styles.rowContainer}>
       <TouchableOpacity
       onPress={()=>{
        this.updateInputString("1");           
       }}
       style={styles.button}
       >         
       <Text style={styles.buttonText}>1</Text>
       </TouchableOpacity>
      
      <TouchableOpacity
       onPress={()=>{
        this.updateInputString("2");           
       }}
       style={styles.button}
       >         
       <Text style={styles.buttonText}>2</Text>
       </TouchableOpacity>
      
       <TouchableOpacity
       onPress={()=>{
        this.updateInputString("3");           
       }}
       style={styles.button}
       >         
       <Text style={styles.buttonText}>3</Text>
       </TouchableOpacity>
       
       <TouchableOpacity
       onPress={()=>{
        this.updateInputString("+");           
       }}
       style={styles.specialButton}
       >
       <Text style={[styles.buttonText]}>+</Text>         
       </TouchableOpacity>

      </View>
    


      <View style={styles.rowContainer}>
      <TouchableOpacity
      onPress={()=>{
        this.updateInputString("√");           
      }}
      style={styles.button}
      >         
      <Text style={styles.buttonText}>√</Text>
      </TouchableOpacity>
     
     <TouchableOpacity
      onPress={()=>{
        this.updateInputString("0");           
      }}
      style={styles.button}
      >         
      <Text style={styles.buttonText}>0</Text>
      </TouchableOpacity>
     
      <TouchableOpacity
      onPress={()=>{
        this.updateInputString(".");           
      }}
      style={styles.button}
      >         
      <Text style={styles.buttonText}>.</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
      onPress={()=>{
          this.displayAnswer();
      }}
      style={styles.specialButton}
      >
      <Text style={[styles.buttonText]}>=</Text>         
      </TouchableOpacity>

     </View>  
      
    
     </View>   

    </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: 'black',
    // borderWidth:1,  
    backgroundColor:"#000000",
    marginTop:31,    
  },
  displayScreen:{
    flex:1,
    flexDirection:"row",
    // borderColor:"blue",
    // borderWidth:2, 
    alignItems:"flex-end",
  },
  displayInput:{
    height: Dimensions.get('window').height*0.20,
    width:Dimensions.get('window').width*0.90,
    marginHorizontal:Dimensions.get('window').width*0.05,
    textAlign:"right",
    color:"#fff",
    // borderColor: 'gray',
    // borderWidth: 1,
    fontSize: responsiveFontSize(5),
    fontWeight: "700",

  },
  gridContainer:{
   flex:1,
  //  borderColor:"green",
  //  borderWidth:4,
  },
  rowContainer:{
    flex:1, 
    flexDirection:"row",  
    // borderColor:"red",
    // borderWidth:2,
  },
  button:{
    flex:1,  
    backgroundColor:"#1d3849",
    borderColor:"black",
    borderWidth:2,
    justifyContent:"center",
    alignItems:"center",
    margin:1
  },
  specialButton:{
    flex:1,  
    backgroundColor:"#51b8a6",
    borderColor:"black",
    borderWidth:2,
    justifyContent:"center",
    alignItems:"center",
    margin:1
  },
  buttonText:{
    fontSize: responsiveFontSize(2.5),
    fontWeight:"500",
    color:"#fff",
  }

});
