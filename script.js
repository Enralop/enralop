document.addEventListener('DOMContentLoaded', () => {


    const discordApiLogic = () => {
        const serverId = '962464162842292304';
        const apiUrl = `https://discord.com/api/guilds/${serverId}/widget.json`;
        const serverNameEl = document.getElementById('server-name');
        const onlineMembersEl = document.getElementById('online-members');
        const serverIconEl = document.getElementById('server-icon');
        const joinLinkEl = document.getElementById('discord-join-link');
        fetch(apiUrl).then(response => response.json()).then(data => {
            if(serverNameEl) serverNameEl.textContent = data.name;
            if(serverIconEl && data.id && data.icon) serverIconEl.src = `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png`;
            if(onlineMembersEl) onlineMembersEl.textContent = data.presence_count;
            if(document.getElementById('total-members')) document.getElementById('total-members').textContent = "200+";
            if(joinLinkEl && data.instant_invite) joinLinkEl.href = data.instant_invite;
        }).catch(error => {
            console.error('Error al obtener datos de Discord:', error);
            if(serverNameEl) serverNameEl.textContent = 'Error al cargar';
        });
    };
    discordApiLogic();



    const sections = {
        profile: document.getElementById('profile-section'),
        kick: document.getElementById('kick-section'),
        tiktok: document.getElementById('tiktok-section'),
    };

    const threshold1 = window.innerHeight * 0.7; 
    const threshold2 = window.innerHeight * 1.7;
    const handleScroll = () => {
        const scrollY = window.scrollY;

        if (scrollY < threshold1) {
            sections.profile.classList.add('is-visible');
            sections.profile.classList.remove('is-exiting');

            sections.kick.classList.remove('is-visible');
            sections.tiktok.classList.remove('is-visible');
        }

        else if (scrollY >= threshold1 && scrollY < threshold2) {
            sections.profile.classList.add('is-exiting'); 
            sections.profile.classList.remove('is-visible');

            sections.kick.classList.add('is-visible');
            sections.kick.classList.remove('is-exiting');

            sections.tiktok.classList.remove('is-visible');
        }

        else {
            sections.kick.classList.add('is-exiting'); 
            sections.kick.classList.remove('is-visible');

            sections.tiktok.classList.add('is-visible');
            sections.tiktok.classList.remove('is-exiting');
        }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

});
