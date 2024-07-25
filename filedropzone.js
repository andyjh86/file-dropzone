document.addEventListener('DOMContentLoaded', function() {
    var dropZone = document.getElementById('drop_zone');
    var uploadButton = document.getElementById('upload_btn');
    var fileListElement = document.getElementById('file_list');
    var files = [];
    var imageCounter = 1;

    function updateFileList() {
        fileListElement.innerHTML = ''; // Clear the current list
        files.forEach(function(file, index) {
            var li = document.createElement('li');
            li.textContent = file.name;
            fileListElement.appendChild(li);
        });
    }

    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('hover');
    });

    dropZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('hover');
    });

    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('hover');

        // Retrieve files from the drop event
        var newFiles = Array.from(e.dataTransfer.files);
        files = files.concat(newFiles);

        updateFileList(); // Update the list displayed on the page
    });

    document.addEventListener('paste', function(e) {
        var clipboardItems = e.clipboardData.items;
        var newFiles = [];

        for (var i = 0; i < clipboardItems.length; i++) {
            var item = clipboardItems[i];
            if (item.kind === 'file') {
                var file = item.getAsFile();
                var newFile = new File([file], `image ${imageCounter++}`, { type: file.type });
                newFiles.push(newFile);
            }
        }

        if (newFiles.length > 0) {
            files = files.concat(newFiles);
            updateFileList();
        }
    });

    uploadButton.addEventListener('click', function() {
        if (files.length === 0) {
            alert('No files to upload.');
            return;
        }

        // Example: log the file names to the console
        files.forEach(function(file) {
            console.log('Uploading:', file.name);
            // Implement upload logic here
        });

        // Clear the files array and list on the page after processing
        files = [];
        updateFileList();
        imageCounter = 1; // Reset the image counter
    });
});
