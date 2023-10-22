function convertToCSV(){
    let upload=document.getElementById('upload');
    let file =upload.files[0];//获取单个文件（单文件上传）

    //使用FileReader读取文件内容
    let reader=new FileReader();
    reader.onload=function(e){
        let data=e.target.result;
        let workbook=XLSX.read(data,{
            type:'binary'
        });
        //转换成csv
        let firstSheetName=workbook.SheetNames[0];
        let worksheet=workbook.Sheets[firstSheetName];
        let csv = XLSX.utils.sheet_to_csv(worksheet);

        //创建下载链接
        downloadCSV(csv,`${file.name.split('.')[0]}.csv`);
    };
    reader.readAsBinaryString(file);

    function downloadCSV(csv,filename){
        let csvFile;
        let downloadLink;
        //csv文件
        csvFile=new Blob([csv],{type:"text/csv"});
        //下载链接
        downloadLink=document.createElement('a');
        downloadLink.download=filename;
        downloadLink.href=window.URL.createObjectURL(csvFile);
        downloadLink.style.display='none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
}