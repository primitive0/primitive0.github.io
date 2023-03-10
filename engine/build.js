const fs = require('fs');
const path = require('path');
const CyrillicToTranslit = require('cyrillic-to-translit-js');
const translit = new CyrillicToTranslit();
const meta = require('./meta');
const pageBuilder = require('./builder');

const OUT_DIR = path.join(process.cwd(), 'dist');

function mkdir(path, options) {
	try {
        fs.mkdirSync(path, options);
    } catch (err) {
		if (err.code == 'EEXIST') {
            return;
        }
        throw err;
	}
}

function writeTo(relativePath, data) {
    let parts = relativePath.split('/').filter(v => v != '');
    parts.pop();
    if (parts.length != 0) {
        mkdir(path.join(OUT_DIR, parts.join('/')));
    }
    fs.writeFileSync(path.join(OUT_DIR, relativePath), data);
}

function copy(src, dst) {
	if (fs.statSync(src).isDirectory()) {
		mkdir(dst);
		for (const name of fs.readdirSync(src)) {
			copy(path.join(src, name), path.join(dst, name));
		}
	} else {
		fs.copyFileSync(src, dst);
	}
}

// TODO: config
function makePostUrl(dirName) {
    let name = translit.transform(dirName);
    return `/post/${name}`;
}

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts');

mkdir(OUT_DIR);
writeTo('index.html', pageBuilder.buildIndex(POSTS_DIRECTORY, makePostUrl));

for (let postInfo of meta.grapPostsInfo(POSTS_DIRECTORY)) {
    let file = makePostUrl(postInfo.dirName) + '.html';
    let contents = pageBuilder.buildPost(POSTS_DIRECTORY, postInfo.dirName);
    writeTo(file, contents);
}

copy(path.join(process.cwd(), 'static'), OUT_DIR);
