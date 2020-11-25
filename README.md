# DataVizReactTable

People google questions like "How do I make a scrollable table? How do I make table header stick? How do I add histogram over each column of my table? How do I make my table sort by column? How do I filter columns in my table? How do I filter values in my table? How do I make more friends?"

Omg now there is a one-liner tag that that solves your table problems.

![Alt text](https://thetruecaptian.github.io/img/datavizreacttable.png "Bam")

Install with:
```
npm install datavizreactable
```

Import it with:
```javascript
import DataVizReactTable from 'datavizreactable';
```

Prepare your data:
```javascript
let columns = ['first_name', 'last_name', 'birth_year',	'city',	'state', 'military', 'gender'];
let data = {
       1: {'first_name':'Anna', 'last_name':'Shaughn', 'birth_year':1985, 'city':'Lansing', 'state':'MI', 'military':'N', 'gender':'M'},
       2: {'first_name':'Emma', 'last_name':'Shaune', 'birth_year':1998, 'city':'Dearborn', 'state':'MI', 'military':'N', 'gender':'F'},
       3: {'first_name':'Elizabeth', 'last_name':'Shem', 'birth_year':1989, 'city':'Dearborn Heights', 'state':'MI', 'military':'Y', 'gender':'F'},
       4: {'first_name':'Minnie', 'last_name':'Shonn', 'birth_year':1986, 'city':'Wayne', 'state':'MI', 'military':'N', 'gender':'F'},
       5: {'first_name':'Margaret', 'last_name':'Sigurd', 'birth_year':1989, 'city':'Detroit', 'state':'MI', 'military':'Y', 'gender':'M'},
       6: {'first_name':'Ida', 'last_name':'Simcha', 'birth_year':1998, 'city':'Detroit', 'state':'MI', 'military':'N', 'gender':'F'},
       7: {'first_name':'Alice', 'last_name':'Skeeter', 'birth_year':1995, 'city':'Lansing', 'state':'MI', 'military':'N', 'gender':'M'},
       8: {'first_name':'Bertha', 'last_name':'Slyvester', 'birth_year':1994, 'city':'Dearnborn', 'state':'MI', 'military':'Y', 'gender':'M'},
       9: {'first_name':'Sarah', 'last_name':'Smiley', 'birth_year':1999, 'city':'Pontiac', 'state':'MI', 'military':'N', 'gender':'M'},
       10: {'first_name':'Annie', 'last_name':'Soren', 'birth_year':2000, 'city':'Pontiac', 'state':'MI', 'military':'Y', 'gender':'F'}
};
```
Set some options here:
```javascript
//Required!
let renderConst = {'maxheight': 300};
//Optional params
let options = {
    'title':'Dummy Table',
    'columnWidth': 200,
    'highlightColor': 'yellow',
    'histogramColor': '#5DADE2'
};
```

And then you can just visualize your data in the render() with:
```
    <DataVizReactTable 
        data={data}
        columns={columns}
        title='Dummy Table'
        renderConst={renderConst}
        options={options}
    > 
    </DataVizReactTable>
```
