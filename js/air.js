window.air_county = {};
$.ajax({
	url: 'http://rureta.me/air/json/all.json',
	type: 'GET',
	dataType: 'json',
})
.done(function(data) {
	window.data = data;
	var select_county = document.getElementById("select_county");
	for(var i=0 ; i< data.length ; i++)
	{
		if(typeof(window.air_county[data[i].County]) == 'undefined')
		{
			var html = $.parseHTML("<option value=\"" + data[i].County + "\">" + data[i].County + "<\/option>");
			$('#select_county').append(html);
			window.air_county[data[i].County] = [];
		}
		if(typeof(window.air_county[data[i].County]['site']) == 'undefined')
		{
			window.air_county[data[i].County]['site'] = [];
		}

		var thisCoutry = data[i].County;
		delete data[i].County;
		window.air_county[thisCoutry].push(data[i]);
		$('#select_county').val('臺北市');
		$('select').material_select();
		conuty_change();
		site_change();
	}
	init();
	$("#loading-screen").fadeOut(1000);
})
.fail(function() {
	console.log("error");
})
.always(function() {
});

function conuty_change(){
	var select_county = $('#select_county :selected').text();

	var select_site = document.getElementById("select_site");
	var county = window.air_county[select_county];

	$('#select_site').empty();
	var html = $.parseHTML("<option value=\"\" disabled selected>選擇區域<\/option>");
	$('#select_site').append(html);
	for(var i=0 ; i<county.length ; i++)
	{
	 	var html = $.parseHTML("<option value=\"" + i + "\">" + county[i].SiteName + "<\/option>");
	 	$('#select_site').append(html);
	 }
	$('#select_site').val(0);
	site_change();
	$('select').material_select();
}
function site_change(){
	var select_county = $('#select_county :selected').text();
	var select_site = $('#select_site :selected').val();
	var air_details = window.air_county[select_county][select_site];
	var FPMI_status = '',PSI_color,PM25_color;
	var html;

	if (air_details.FPMI >= 10)
		FPMI_status = '非常高';
	else if (air_details.FPMI >= 7)
		FPMI_status = '高';
	else if (air_details.FPMI >= 4)
		FPMI_status = '中';
	else if (air_details.FPMI >= 1)
		FPMI_status = '低';
	else
		FPMI_status = '';

	if (air_details.PSI >= 300)
		PSI_color = '#633300';
	else if (air_details.PSI >= 200)
		PSI_color = '#800080';
	else if (air_details.PSI >= 101)
		PSI_color = '#FF0000';
	else if (air_details.PSI >= 51)
		PSI_color = '#FFFF00';
	else if (air_details.PSI >= 0)
		PSI_color = '#00FF00';
	else
		PSI_color = 'white';

	if (air_details.FPMI == 1)
		PM25_color = '#9CFF9C';
	else if (air_details.FPMI == 2)
		PM25_color = '#31FF00';
	else if (air_details.FPMI == 3)
		PM25_color = '#31CF00';
	else if (air_details.FPMI == 4)
		PM25_color = '#FFFF00';
	else if (air_details.FPMI == 5)
		PM25_color = '#FFCF00';
	else if (air_details.FPMI == 6)
		PM25_color = '#FF9A00';
	else if (air_details.FPMI == 7)
		PM25_color = '#FF6464';
	else if (air_details.FPMI == 8)
		PM25_color = '#FF0000';
	else if (air_details.FPMI == 9)
		PM25_color = '#900';
	else if (air_details.FPMI == 10)
		PM25_color = '#CE30FF';
	else
		PM25_color = 'white';

	$('#PSI_color').css('color', PSI_color)
	$('#PM25_color').css('color', PM25_color)



	$('#PSI').text(air_details.Status + " " + nothing(air_details.PSI));
	$('#FPMI').text(FPMI_status + " " + nothing(air_details.FPMI));

	$('#PM2p5').empty();
	html = $.parseHTML(nothing(air_details.PM2p5) + " μg/m<sup>3</sup>");
	$('#PM2p5').append(html);

	$('#PM10').empty();
	html = $.parseHTML(nothing(air_details.PM10) + " μg/m<sup>3</sup>");
	$('#PM10').append(html);

	$('#O3').text(nothing(air_details.O3) + " ppb");
	$('#CO').text(nothing(air_details.CO) + " ppm");
	$('#NO').text(nothing(air_details.NO) + " ppb");
	$('#NO2').text(nothing(air_details.NO2) + " ppb");
	$('#NOx').text(nothing(air_details.NOx) + " ppb");
	$('#SO2').text(nothing(air_details.SO2) + " ppb");
	$('#WindSpeed').text(nothing(nothing(air_details.WindSpeed)) + " m/s");
	$('#PublishTime').text("最後更新時間 " + air_details.PublishTime);
}

function nothing(air_data) {
	if (air_data == "")
		return "-";
	return air_data;
}

function init(){
	$('#select_county').change(function(){
		conuty_change();
	});
	$('#select_site').change(function(){
		site_change();
	});
}