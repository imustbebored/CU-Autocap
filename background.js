// var selection = window.getSelection();
//         if (selection.rangeCount > 0)
//             return selection.getRangeAt(0).startContainer.parentNode;


const words = ['automation', 'action', 'conditions','trigger','clip','column','dashboard','doc','favorites','folder','formula','goal','hierarchy','home','list','notepad','profiles','proofing','pulse','sidebar','space','active','closed','table','targets','teams','trash','v2','sprint'];

const wordsToReplace=[
  "clickup objects",
  "clickup",
  "clickapps",
  "clickapp",
  "automations menu",
  "custom automations?",
  "automations shortcuts",
  "bulk action toolbar",
  "multitask toolbar",
  "email clickapp",
  "time estimate clickapp",
  "milestone clickapp",
  "not started status group",
  "priority clickapp",
  "relationships clickapp",
  "sprints clickapp",
  "tags clickapp",
  "command center",
  "community templates",
  "label custom field",
  "date custom field",
  "dropdown custom field",
  "formula fields",
  "formula field",
  "phone custom field",
  "website custom field",
  "custom field",
  "drag and drop",
  "form view",
  "clean layout",
  "modern layout",
  "simple layout",
  "lineup",
  "dark mode",
  "everyone mode",
  "high contrast mode",
  "light mode",
  "me mode",
  "offline mode",
  "page settings menu",
  "page template",
  "partner program",
  "affiliate program",
  "referral program",
  "personal view",
  "priority",
  "priorities",
  "free forever plan",
  "unlimited plan",
  "business plan",
  "business plus plan",
  "enterprise plan",
  "quickswitch",
  "quick action menu",
  "quick create task button",
  "reminder feature",
  "rich text format",
  "map view sidebar",
  "people sidebar",
  "single sign on",
  "saml",
  "sso",
  "third party identity provider",
  "smart alignment guidelines",
  "sprint feature",
  "sprint folder",
  "not started",
  "custom task ids",
  "task id",
  "task views",
  "list view",
  "board view",
  "calendar view",
  "view templates",
  "template center",
  "trash icon",
  "two factor authentication",
  "two way sync",
  "activity view",
  "box view",
  "chat view",
  "doc view",
  "embed view",
  "gantt view",
  "map view",
  "mind maps",
  "task mode",
  "blank mode",
  "table view",
  "timeline view",
  "workload view",
  "views bar",
  "website card",
  "whiteboard",
  "assignee widget",
  "bar chart widget",
  "custom widget",
  "pie chart",
  "portfolio",
  "dashboard widget",
  "embed widget",
  "task list widget",
  "workspace",
  "done status",
  "home list",
  "listed",
  "listing"
];





const wordsReplaceWith=[
  "ClickUp Objects",
  "ClickUp",
  "ClickApps",
  "ClickApp",
  "Automations menu",
  "Custom Automation",
  "Automations Shortcuts",
  "Bulk Action Toolbar",
  "Multitask Toolbar",
  "Email ClickApp",
  "Time Estimate ClickApp",
  "Milestone ClickApp",
  "Not Started Status Group",
  "Priority ClickApp",
  "Relationships ClickApp",
  "Sprints ClickApp",
  "Tags ClickApp",
  "Command Center",
  "Community templates",
  "label custom field",
  "Date Custom Field",
  "Dropdown Custom Field",
  "Formula Fields",
  "Formula Field",
  "Phone Custom Field",
  "Website Custom Field",
  "Custom Field",
  "drag-and-drop",
  "Form view",
  "Clean layout",
  "Modern layout",
  "Simple layout",
  "LineUp",
  "Dark Mode",
  "Everyone Mode",
  "High Contrast Mode",
  "Light Mode",
  "Me Mode",
  "Offline Mode",
  "Page settings menu",
  "Page template",
  "Partner Program",
  "Affiliate Program",
  "Referral Program",
  "Personal view",
  "Priority",
  "Priorities",
  "Free Forever Plan",
  "Unlimited Plan",
  "Business Plan",
  "Business Plus Plan",
  "Enterprise Plan",
  "QuickSwitch",
  "Quick Action menu",
  "Quick Create task button",
  "Reminder feature",
  "Rich Text Format",
  "Map View Sidebar",
  "People Sidebar",
  "single sign-on",
  "SAML",
  "SSO",
  "third-party identity provider",
  "Smart Alignment Guidelines",
  "Sprint feature",
  "Sprint Folder",
  "Not Started",
  "Custom Task IDs",
  "task ID",
  "Task views",
  "List view",
  "Board view",
  "Calendar view",
  "View templates",
  "Template Center",
  "trash icon",
  "two-factor authentication",
  "two-way sync",
  "Activity view",
  "Box view",
  "Chat view",
  "Doc view",
  "Embed view",
  "Gantt view",
  "Map view",
  "Mind Maps",
  "Task Mode",
  "Blank Mode",
  "Table view",
  "Timeline view",
  "Workload view",
  "Views Bar",
  "Website Card",
  "Whiteboard",
  "Assignee widget",
  "Bar Chart widget",
  "Custom widget",
  "Pie Chart",
  "Portfolio",
  "Dashboard widget",
  "Embed widget",
  "Task List widget",
  "Workspace",
  "Done status",
  "home list",
  "listed",
  "listing"
];



const titleCase = str => str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())
const makeRegex = str => new RegExp("\\b" + str + "\\b", "gi");

const specialSymbol='____==____'
let lastTimeRunning=new Date().getTime()
let nextRunningTimeout=null;
let element=null;
let previousUrl = '';
let previouElement = '';
let selection=null;
let previousSelection='';
let updatedText=false;

function replaceTextFinal(el){
        let urlRegex = /((http|ftp|https)\:\/\/)?([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/gi
        let string = el.textContent;
        let urlMatches=urlRegex.test(string);
        console.log('@el.textContent ------------------ ',string, urlMatches);
        if(!urlMatches){
          wordsToReplace.forEach((word,index)=>{
            string = string.replace(makeRegex(word),specialSymbol+wordsReplaceWith[index]+specialSymbol);

          });
          words.forEach(word => string = string.replace(makeRegex(word), s => titleCase(s)));

          string=string.replace(/____==____/gi, '');
          //console.log('string 22 ',string)
          if( string!=='' && string !== el.textContent){
            updatedText=true;
            el.textContent=string;
            
            // el = document.createTextNode(string);

          }
       }
}


function getAllElementsNode(node,all) { 
  
  all.push(...node.childNodes);
  node.childNodes.forEach((el)=>{
    window.el=el;
    //console.log('@el ',el,' el.nodeType ', el.nodeType);
    if(el.nodeType === Node.TEXT_NODE){
      replaceTextFinal(el);
    }
  })
  // console.log('node.childNodes, all',node.childNodes, all);
  for (const child of node.childNodes) {
    // console.log('@el.nodeName = ',child.nodeName);
    if(child.nodeName !=='A'){
      getAllElementsNode(child, all);
    }
  }
  return all;
}




function replaceText(){
      lastTimeRunning=new Date().getTime();
      // let allElements=document.querySelectorAll(".depXzB .ck-editor__editable_inline p");
      // let i=2;
      // allElements.forEach((el)=>{
        
        // let node=document.querySelector(".depXzB .ck-editor__editable_inline");
        getAllElementsNode(element,[]);

      // })

      // // replaceTextFinal()
      // [optional] make sure focus is on the element
      // element.focus();
      // // select all the content in the element
      // document.execCommand('selectAll', false, null);
      // // collapse selection to the end
      // document.getSelection().collapseToEnd();
      
}


// function capitalHandler(){
//   element.addEventListener("input", function() {
//     replaceText()
//     // if(lastTimeRunning-new Date().getTime()>1){
//     //   if(nextRunningTimeout){
//     //     clearTimeout(nextRunningTimeout);
//     //   }
//     //   // lastTimeRunning=new Date().getTime();
//     //   // console.log('replaceText ****************************** 1 ')
//     //   replaceText()
//     // }
//     // else{
//     //   if(nextRunningTimeout){
//     //     clearTimeout(nextRunningTimeout);
//     //   }
//     //   nextRunningTimeout=setTimeout(()=>{
//     //     // lastTimeRunning=new Date().getTime();
//     //     //console.log('replaceText ******************************')
//     //     replaceText()
//     //   },1);
//     // }
//   });
// }




// // let previousTimeout
// function startHandling(bypass=1, n=0){
//   setTimeout(()=>{
//     // element= document.querySelector(".depXzB .ck-editor__editable_inline");
//     findSelectedNode()
//     // console.log('@new element ========================= ',element)
//     if(element){
//       capitalHandler();
//       // update element 1 more time
//       // if(bypass===1){
//       //   startHandling(2, n+1);
//       // }
      
//     }
//     else if(n<11){
//       startHandling(n+1)
//     }
//   },n*1000);
// }




document.addEventListener("keyup", function(e) {
    e.preventDefault();
    element = e.target;

    
    if (element.isContentEditable){
        updatedText=false;
        let pos= CaretUtil.getCaretPosition(element)
        //console.log('@cursor pos >>> ',pos)
        replaceText();
        
        

        if(updatedText){
            
            console.log('updated text');
            // sel.getRangeAt(0).setStart(focusNode,offset);
            window.lastCaretElement=element;
            //console.log('@cursor updated to ',CaretUtil.getCaretPosition(element))
            element.focus();
            // select all the content in the element
            document.execCommand('selectAll', false, null);
            // setTimeout(()=>{
            //     // debugger;
                
            CaretUtil.setCaretPosition(element, pos);
            //     console.log('@cursor change =========== ', CaretUtil.getCaretPosition(element));
            // },0);
            
        }
     }

});




// CaretUtil library, based on
// https://stackoverflow.com/questions/6249095/41034697#41034697
var CaretUtil = { };

window.CaretUtil=CaretUtil;
/**
 * Set the caret position inside a contentEditable container
 */
CaretUtil.setCaretPosition = function(container, position) {
  if(position >= 0) {
    var selection = window.getSelection();
    var range = CaretUtil.createRange(container,{ count : position});
    if(range != null) {
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
};

/**
 * Get the current caret position inside a contentEditable container
 */
CaretUtil.getCaretPosition = function(container) {
  var selection = window.getSelection();
  var charCount = -1;
  var node;
  if(selection.focusNode != null) {
    if(CaretUtil.isDescendantOf(selection.focusNode,container)) {
      node = selection.focusNode;
      charCount = selection.focusOffset;
      while(node != null) {
        if(node == container) {
          break;
        }
        if(node.previousSibling != null) {
          node = node.previousSibling;
          charCount += node.textContent.length;
        } else {
          node = node.parentNode;
          if(node == null) {
            break;
          }
        }
      }
    }
  }
  return charCount;
};

/**
 * Returns true if the node is a descendant (or equal to) a parent
 */
CaretUtil.isDescendantOf = function(node,parent) {
  while(node != null) {
    if(node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

CaretUtil.createRange = function(node,chars,range) {
  if(range == null) {
    range = window.document.createRange();
    range.selectNode(node);
    range.setStart(node,0);
  }
  if(chars.count == 0) {
    range.setEnd(node,chars.count);
  } else if(node != null && chars.count > 0) {
    if(node.nodeType == 3) {
      if(node.textContent.length < chars.count) {
        chars.count -= node.textContent.length;
      } else {
        range.setEnd(node,chars.count);
        chars.count = 0;
      }
    } else {
      var _g = 0;
      var _g1 = node.childNodes.length;
      while(_g < _g1) {
        var lp = _g++;
        range = CaretUtil.createRange(node.childNodes[lp],chars,range);
        if(chars.count == 0) {
          break;
        }
      }
    }
  }
  return range;
};