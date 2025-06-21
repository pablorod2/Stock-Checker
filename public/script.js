document.getElementById('testForm2').addEventListener('submit', e => {
  e.preventDefault();
  const stock = e.target[0].value;
  const checkbox = e.target[1].checked;
  let fetchstr = `/api/stock-prices/?stock=${stock}`;
  if (checkbox){
    fetchstr += `&like=${checkbox}`;
  } 
  fetch(fetchstr)
    .then(res => res.json())
    .then(data => {
      document.getElementById('jsonResult').innerText = JSON.stringify(data);
    });
});

document.getElementById('testForm').addEventListener('submit', e => {
  e.preventDefault();
  const stock1 = e.target[0].value;
  const stock2 = e.target[1].value;
  const checkbox = e.target[2].checked;
  let fetchstr = `/api/stock-prices?stock=${stock1}&stock=${stock2}`;
  if (checkbox){
    fetchstr += `&like=${checkbox}`;
  } 
  fetch(fetchstr)
    .then(res => res.json())
    .then(data => {
      document.getElementById('jsonResult').innerText = JSON.stringify(data);
    });
});
