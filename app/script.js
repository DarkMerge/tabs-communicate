let btn = document.getElementById('test');
let result = document.getElementById('result');
let pageGuid = guid();

btn.addEventListener('click', function () {
    messageBroadcast('test ' + pageGuid);
});

window.addEventListener('storage', messageReceived);

/*
key	DOMString	Represents the key changed. The key attribute is null when the change is caused by the storage clear() method. Read only.
newValue	DOMString	The new value of the key. The newValue is null when the change has been invoked by storage clear() method or the key has been removed from the storage. Read only.
oldValue	DOMString	The original value of the key. The oldValue is null when the change has been invoked by storage clear() method or the key has been newly added and therefor doesn't have any previous value. Read only.
storageArea	nsIDOMStorage	Represents the Storage object that was affected. Read only.
url	DOMString	The URL of the document whose key changed. Read only.
* */

function messageBroadcast(message) {
    if (!localStorage.getItem('message')) {
        localStorage.setItem('message', JSON.stringify([]));
    } else {
        let pages = JSON.parse(localStorage.getItem('message'));
        if (pages.indexOf(message) === -1) {
            pages.push(message);
            localStorage.setItem('message', JSON.stringify(message));
        }
    }
}

function messageReceived(ev) {
    console.log('ev ', ev);
    if (ev.key === 'message') {
        // let message = JSON.parse(ev.newValue);
    }
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}
