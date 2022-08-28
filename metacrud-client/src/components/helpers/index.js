import * as Input from '../inputs/Index';

export const renderForm = (schema, handleValue, handleSubmit) => {
    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            {
                Object.entries(schema).map((input, key)=>( // devuelve el par [llave : valor] de cada entrada de un pbjeto en forma de array [0 => llave : 1 => valor]                    
                      input[1].type === 'text' ? <Input.Text key={key} input={input} handleValue={handleValue}/> : 
                      input[1].type === 'textarea' ? <Input.Textarea key={key} input={input} handleValue={handleValue}/> : 
                      input[1].type === 'number' ? <Input.Number key={key} input={input} handleValue={handleValue}/> : 
                      input[1].type === 'boolean' ? <Input.Boolean key={key} input={input} handleValue={handleValue}/> : 
                      input[1].type === 'date' ? <Input.Date key={key} input={input} handleValue={handleValue}/> : 
                      input[1].type === 'email' ? <Input.Email key={key} input={input} handleValue={handleValue}/> :
                      input[1].type === 'select' ? <Input.SelectOne key={key} input={input} handleValue={handleValue}/> : null
                ))
            }
            <input type="submit" value="Submit"/>
        </form>
    )
}

/* 
                   : input[1].type === 'date' ? <Input.Dates key={key} input={input} handleValue={handleValue}/> : null
                    : input[1].type === 'password' ? <Input.Password key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'email' ? <Input.Email key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'options' ? <Input.Options key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'boolean' ? <Input.Boolean key={key} input={input} handleValue={handleValue}/>                     
                    : input[1].type === 'textarea' ? <Input.Textarea key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'info' ? <Input.Info key={key} input={input}/> 
                    : input[1].type === 'tags' ? <Input.Tags key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'selectType' ? <Input.SelectType key={key} input={input} handleValue={handleValue}/> 
 

*/