const API = 'http://localhost:8080/api/auth';
let accessToken = null;

function switchTab(tab) {
    clearMsg();

    document.getElementById('login-form').classList.toggle('visible', tab === 'login');
    document.getElementById('register-form').classList.toggle('visible', tab === 'register');
    document.getElementById('tab-login').classList.toggle('active', tab === 'login');
    document.getElementById('tab-register').classList.toggle('active', tab === 'register');
}

function togglePw(id) {
    const input = document.getElementById(id);
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
}

function showMsg(text, type) {
    const el = document.getElementById('msg');
    el.textContent = text;
    el.className = 'msg ' + type;
}

function clearMsg() {
    const el = document.getElementById('msg');
    el.className = 'msg';
    el.textContent = '';
}

function showSession(username, token) {
    accessToken = token;

    document.getElementById('auth-card').style.display = 'none';
    document.getElementById('session-panel').style.display = 'block';
    document.getElementById('s-name').textContent = username;
    document.getElementById('s-avatar').textContent = username.slice(0, 2).toUpperCase();
    document.getElementById('s-token').textContent = 'Bearer ' + token.substring(0, 60) + '...';
}


async function doLogin() {
    clearMsg();

    const username = document.getElementById('l-user').value.trim();
    const password = document.getElementById('l-pass').value;

    if (!username || !password) {
        showMsg('Please fill in all fields.', 'error');
        return;
    }

    try {
        const res = await fetch(API + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            showMsg(data.message || 'Invalid credentials.', 'error');
            return;
        }

        showSession(data.username, data.accessToken);

    } catch (err) {
        showMsg('Cannot connect to server.', 'error');
    }
}

async function doRegister() {
    clearMsg();

    const username = document.getElementById('r-user').value.trim();
    const email    = document.getElementById('r-email').value.trim();
    const password = document.getElementById('r-pass').value;

    if (!username || !email || !password) {
        showMsg('Please fill in all fields.', 'error');
        return;
    }

    if (username.length < 3 || username.length > 20) {
        showMsg('Username must be 3–20 characters.', 'error');
        return;
    }

    if (password.length < 6) {
        showMsg('Password must be at least 6 characters.', 'error');
        return;
    }

    try {
        const res = await fetch(API + '/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            showMsg(data.message || 'Registration failed.', 'error');
            return;
        }

        showSession(data.username, data.accessToken);

    } catch (err) {
        showMsg('Cannot connect to server.', 'error');
    }
}

async function doRefresh() {
    try {
        const res = await fetch(API + '/refresh', {
            method: 'POST',
            credentials: 'include'
        });

        const data = await res.json();

        if (!res.ok) {
            alert('Session expired.');
            doLogout();
            return;
        }

        accessToken = data.accessToken;
        document.getElementById('s-token').textContent = 'Bearer ' + data.accessToken.substring(0, 60) + '...';

    } catch (err) {
        alert('Refresh failed.');
    }
}


async function doLogout() {
    try {
        await fetch(API + '/logout', { method: 'POST', credentials: 'include' });
    } catch (_) {}

    accessToken = null;
    document.getElementById('session-panel').style.display = 'none';
    document.getElementById('auth-card').style.display = 'block';
    document.getElementById('l-user').value = '';
    document.getElementById('l-pass').value = '';
    clearMsg();
    switchTab('login');
}


document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;

    if (document.getElementById('login-form').classList.contains('visible')) {
        doLogin();
    } else {
        doRegister();
    }
});