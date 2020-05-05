d3.json("data/data.json").then(function(data){
parent = document.getElementById("table_place")

table = document.createElement('table');
table.className = "table table-sm table-striped"


table_head = document.createElement('thead')
head_tr = document.createElement('tr');
table_head.appendChild(head_tr)

head_th1 = document.createElement('th');
t1 = document.createTextNode('#')
head_th1.appendChild(t1)
table_head.appendChild(head_th1)

head_th2 = document.createElement('th');
t2 = document.createTextNode('X')
head_th2.appendChild(t2)
table_head.appendChild(head_th2)

head_th3 = document.createElement('th');
t3 = document.createTextNode('Y')
head_th3.appendChild(t3)
table_head.appendChild(head_th3)

head_th4 = document.createElement('th');
t4 = document.createTextNode('Z')
head_th4.appendChild(t4)
table_head.appendChild(head_th4)

table.appendChild(table_head)

console.log(table)

console.log('label')
for (var num_data_case in data){

    var tr = document.createElement('tr');
    var th = document.createElement('th');

    var index = document.createTextNode(parseInt(num_data_case)+1)

    th.appendChild(index)
    
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    var text1 = document.createTextNode(data[num_data_case].x)
    var text2 = document.createTextNode(data[num_data_case].y)
    var text3 = document.createTextNode(data[num_data_case].z)

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)

    tr.appendChild(th)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    table.appendChild(tr)
}


parent.appendChild(table)})