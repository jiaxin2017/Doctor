/**
 * Created by lichun on 2018/4/2.
 */

var HOST = 'http://p10.rise99.com';


function uploadImgHandler(){
	//console.log('change')
	
	var formData = new FormData();
	formData.append('files', $('input[name=myUpImg]')[0].files[0]);

	$.ajax({
		url: HOST+'/index.php?r=home/default/uploaders',
		type: 'POST',
		data: formData,
		contentType: false,
		processData: false,
		cache: false,
		success: function(response) {
			//console.log(typeof response);
			var arrys = JSON.parse(response);
			if(arrys.status == 'SUCCESS'){
				
				sendImgHandler(HOST+arrys.data);
			}
		},
		error: function (jqXHR) {
			console.log(JSON.stringify(jqXHR));
		}
	});
}
