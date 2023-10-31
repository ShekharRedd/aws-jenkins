import React, { useState } from 'react';

import ListItems from './ListItems';

const Content = ( {items , setItems,HandlerCheckbox , Delete,Submit}) => {
      console.log(items)
      return (
        <>        
          <p>Welcome to Online Exam</p> 
          
          {items.length >0  ?(
              <ListItems 
                  items={items}
                  setItems={setItems}
                  HandlerCheckbox={HandlerCheckbox}
                  Delete={Delete}
                  Submit={Submit}
                  
              ></ListItems>
          ) : <p>Empty String</p>}
      
        </>
      );
    };

export default Content;

