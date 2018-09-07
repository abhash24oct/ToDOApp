var tasks =[];

document.addEventListener("DOMContentLoaded",function(){


  if(localStorage.getItem('tasks')!=null){
    tasks=JSON.parse(localStorage.getItem('tasks'));
    displayTasks();
  }
  //Date picker stuffs
    var out= document.getElementById("output");
    var picker = new MaterialDatetimePicker({})
    .on('submit', function(d) {
      
      console.log(d);
      var date= d.toString().split(" ");
      
      out.value = date[0]+" "+date[1]+" "+date[2]+" "+date[3];
      
    });

    var el = document.querySelector('.c-datepicker-btn');
      el.addEventListener('click', function() {
      picker.open();
    }, false);

    
    var createButton=document.getElementById("createTask");

    createButton.addEventListener("click",function(){

        createTask();
    });


    console.log(tasks);

    

})


function createTask(){


 

  var taskName = document.getElementById("taskName");
  var date = document.getElementById("output");
  var id = guid();
  var task={};

  task["Name"]=taskName.value;
  task["Date"]=date.value;
  task["id"]=id;
  task["status"]="U";

  tasks.push(task);
  
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
  displayTasks();

  document.getElementById("taskName").value="";
  document.getElementById("output").value="";
}

function displayTasks(){

  var taskName = document.getElementById("taskName");
  var date = document.getElementById("output");
  var taskcontainer = document.getElementById("taskcontainer");
  console.log(tasks);
    
  taskcontainer.innerText="";
  for(var i=0;i<tasks.length;i++){
      console.log("i"+i);
     

      var newTaskDiv =document.createElement("div");
      newTaskDiv.setAttribute("class","newTask");

      
      //HEADER
      var header =document.createElement("div");
      header.setAttribute("id","taskHeader");

      

      var status= document.createTextNode("Status:");  
      header.appendChild(status);

      var checkboxContainer = document.createElement("span");
      checkboxContainer.setAttribute("class","checkbox");

      var ielement = document.createElement("i"); 
      ielement.setAttribute("id",i);
      if(tasks[i]["status"]=="U"){
       
        ielement.setAttribute("class", "far fa-square");
        
      }else{
        ielement.setAttribute("class", "far fa-check-square");   
      }
      checkboxContainer.appendChild(ielement);
      header.appendChild(checkboxContainer);
      newTaskDiv.appendChild(header);


      //BODY
      var body =document.createElement("div");
      body.setAttribute("id","content");
      
      var h2 = document.createElement("h2");
      var taskheading= document.createTextNode(tasks[i]["Name"]); 
      h2.appendChild(taskheading);
      body.appendChild(h2);
    

      var span = document.createElement("span");
      var taskDeadline= document.createTextNode("Task Deadline :: ");
      span.appendChild(taskDeadline);
      body.appendChild(span);

      var taskDeadlineDate= document.createTextNode(tasks[i]["Date"]);
      body.appendChild(taskDeadlineDate);
      

      newTaskDiv.appendChild(body);
      
      //FOOTER
      var footer =document.createElement("div");
      footer.setAttribute("id","taskFooter");
      

      var viewdiv =document.createElement("div");
      viewdiv.setAttribute("id","viewDiv");
      //<i class="fas fa-eye"></i>
      var iElement2 = document.createElement("i");
      iElement2.setAttribute("class","fas fa-eye");
      viewdiv.appendChild(iElement2);
      var viewText= document.createTextNode("View");
      viewdiv.appendChild(viewText);
      footer.appendChild(viewdiv);

      var delDiv =document.createElement("div");
      delDiv.setAttribute("id","delDiv");
      var iElement3 = document.createElement("i");
      iElement3.setAttribute("class","fas fa-trash-alt");
      delDiv.appendChild(iElement3);
      var delText= document.createTextNode("Delete");
      delDiv.appendChild(delText);
      footer.appendChild(delDiv);


      newTaskDiv.appendChild(footer);
      taskcontainer.appendChild(newTaskDiv);


     
  }
   //After displaying task add evwnt to update status
   if(tasks!=null){
    console.log("tasks are not null");
    var __=document.getElementsByClassName("checkbox");

    for(var j=0;j<__.length;j++){
      
      __[j].addEventListener("click",function(e){
          updateStatus(e.target.getAttribute("id"));
      });
    } 
  }
   
}

//ID generation for task
function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function updateStatus(id){

  console.log("updationg status for array   "+id+" tasks[id][\"status\"]"+tasks[id]["status"]);
  var ielement= document.getElementById(id);
   if(tasks[id]["status"]==="U"){
    
      ielement.setAttribute("class","far fa-check-square");
      tasks[id]["status"]="C";
   }else{
      ielement.setAttribute("class","far fa-square");
      tasks[id]["status"]="U";
   }
   localStorage.setItem('tasks', JSON.stringify(tasks)); 
} 