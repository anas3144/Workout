(async() => {

	let mon = 0;
	let click_on_day = null;
	var array_with_data = await get_calenderinfo_from_db()
	let events = array_with_data



	const cal = document.getElementById('calendar');
	const boxForm = document.getElementById('boxForm');
	const Delete_Event = document.getElementById('Delete_Event');
	const form_box = document.getElementById('form_of_box');
	const Eventinput = document.getElementById('Eventinput');
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	function openbox(date){
		click_on_day = date;
		
		const e_day = events.find(e => e.date === click_on_day);
		if(e_day){
			document.getElementById('DeleteEventText').innerText = e_day.title;
			Delete_Event.style.display = 'block';
		}else{
			boxForm.style.display = 'block';
		}
		form_box.style.display = 'block';
	}

	function Full_Date() {
	const date = new Date();
	if(mon !==0){
		date.setMonth(new Date().getMonth() + mon);
	}

	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();

	const First_Day = new Date(year, month, 1);
	const days_IN_Month = new Date(year, month + 1, 0).getDate();
	
	const Date_st = First_Day.toLocaleDateString('en-su', {
		weekday: 'long',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});
	const the_days_form_last_month = days.indexOf(Date_st.split(', ')[0]);
	document.getElementById('display').innerText = `${date.toLocaleDateString('en-us',{ month: 'long'})} ${year}`;
	
	calendar.innerText = '';
	for(let i = 1; i <= the_days_form_last_month + days_IN_Month; i++) {
		const DayForm = document.createElement('div');
		DayForm.classList.add('day');
		
		if (i > the_days_form_last_month) {
		DayForm.innerText = i - the_days_form_last_month;
		const e_day = events.find(e => e.date === `${month +1}/${i -  the_days_form_last_month }/${year}`);
		
		if(e_day){
			const e_event = document.createElement('div');
			e_event.classList.add('event');
			e_event.innerText = e_day.title;
			DayForm.appendChild(e_event);
		}
		DayForm.addEventListener('click', () => openbox(`${month +1}/${i -  the_days_form_last_month }/${year}`));
		} else {
		DayForm.classList.add('padding');
		}

		cal.appendChild(DayForm);    
	}	
	
	}

	function Delete(){
		fetch('http://localhost:3000/customer/delete_calenderinfo', { 
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				date: click_on_day
			})
		})
		.then(function (response) {
			window.location.href = response.url;
			return response.json();
		})
		.catch(function (err) {
		});
		close_box();
	}

	function close_box(){
		Eventinput.classList.remove('error');
		boxForm.style.display = 'none';
		Delete_Event.style.display = 'none';
		form_box.style.display = 'none';
		Eventinput.value = "";
		click_on_day = null;
		Full_Date();
	}

	function save_box(){
		if (Eventinput.value) {
			Eventinput.classList.remove('error');
			events.push({
				date: click_on_day,
				title: Eventinput.value,
			});
			fetch('http://localhost:3000/customer/save_calender_info', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					date: click_on_day,
					data: Eventinput.value
				})
			})
			.then(function (response) {
				window.location.href = response.url;
			})
			.catch(function (err) {
				console.log('error: ' + err);
			});
			close_box();
		}else {
			Eventinput.classList.add('error');
		}
	}
	function init(){
		document.getElementById('next').addEventListener('click',()=>{
			mon++;
			Full_Date();
		});
		document.getElementById('back').addEventListener('click',()=>{
			mon--;
			Full_Date();
		});
	document.getElementById('saveButton').addEventListener('click', save_box);
	document.getElementById('cancelButton').addEventListener('click',close_box);
	document.getElementById('deleteButton').addEventListener('click', Delete);
	document.getElementById('cancelButton').addEventListener('click',close_box);
	}


	init()
	Full_Date();

	function get_calenderinfo_from_db(){
		response2 = fetch('http://localhost:3000/customer/calenderinfo_from_db', {
			method: 'GET',   
			headers: {
				'Content-Type': 'application/json'
			}
		})       
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			array_with_comments = new Array
			array_with_comments = display_calenderinfo(data) 
			return array_with_comments
		
		})
		.catch(function (err) {
		});
		return response2
	}

	function display_calenderinfo(data){
		var array = new Array(); 
		for(var i = 0; i < data.length; i++){
			let comment = {
				date: data[i].date,
				title: data[i].title
			}
			array.push(comment)
		}
		return array
	}

})();