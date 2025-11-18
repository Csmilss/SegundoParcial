import { sequelize } from './db.js';
import { Usuario } from './models/Usuario.js';
import { Publicacion } from './models/Publicacion.js';
import { Comentario } from './models/Comentario.js';

// Inicializar relaciones
const models = { Usuario, Publicacion, Comentario };
Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

async function seed() {
    try {
        // Sincronizar base de datos (borra y recrea las tablas)
        await sequelize.sync({ force: true });
        console.log('✅ Base de datos sincronizada');

        // Crear usuarios gamers
        const usuarios = await Usuario.bulkCreate([
            {
                nombre: 'TheDragonSlayer',
                correo: 'dragonslayer@gaming.com',
                ciudad: 'Córdoba'
            },
            {
                nombre: 'PixelWarrior',
                correo: 'pixelwarrior@gaming.com',
                ciudad: 'Buenos Aires'
            },
            {
                nombre: 'NinjaStrike',
                correo: 'ninjastrike@gaming.com',
                ciudad: 'Rosario'
            },
            {
                nombre: 'CyberMage',
                correo: 'cybermage@gaming.com',
                ciudad: 'Mendoza'
            },
            {
                nombre: 'ShadowHunter',
                correo: 'shadowhunter@gaming.com',
                ciudad: 'La Plata'
            }
        ]);
        console.log(`✅ ${usuarios.length} usuarios creados`);

        // Crear publicaciones sobre juegos
        const publicaciones = await Publicacion.bulkCreate([
            {
                usuarioId: 1,
                titulo: '¡Acabo de derrotar al jefe final de Elden Ring!',
                cuerpo: 'Después de 50 intentos, finalmente logré vencer a Malenia. La clave fue mejorar mi paciencia y timing. ¿Alguien más luchó tanto con este jefe?'
            },
            {
                usuarioId: 1,
                titulo: 'Review: Baldur\'s Gate 3',
                cuerpo: 'Este juego es una obra maestra del RPG. Las decisiones realmente importan y cada partida es única. 10/10, totalmente recomendado para fans del D&D.'
            },
            {
                usuarioId: 2,
                titulo: 'Buscando equipo para ranked de Valorant',
                cuerpo: 'Soy main Jett, rango Platino 2. Busco team serio para subir a Diamante esta season. Disponibilidad: noches de lunes a viernes.'
            },
            {
                usuarioId: 2,
                titulo: 'Mi setup gaming 2024',
                cuerpo: 'Finalmente terminé mi setup: RTX 4070, Ryzen 7 5800X, 32GB RAM y monitor 240Hz. El salto de calidad es brutal, especialmente en shooters competitivos.'
            },
            {
                usuarioId: 3,
                titulo: 'Speedrun de Hollow Knight: 2h 15min',
                cuerpo: 'Logré mi mejor tiempo en Any% glitchless. Todavía me falta optimizar la ruta en City of Tears. ¿Algún tip para mejorar?'
            },
            {
                usuarioId: 3,
                titulo: 'Los mejores indies de 2024',
                cuerpo: 'Mis favoritos del año: Hades 2, Celeste 2, y ese roguelike nuevo que salió en Steam. ¿Cuáles son sus recomendaciones?'
            },
            {
                usuarioId: 4,
                titulo: 'Torneo local de League of Legends',
                cuerpo: 'Estamos organizando un torneo presencial en Mendoza para el próximo mes. Premios: $500.000 para el primer puesto. ¡Inscripciones abiertas!'
            },
            {
                usuarioId: 4,
                titulo: 'Guía: Cómo farmear eficientemente en Stardew Valley',
                cuerpo: 'Después de 200 horas, estos son mis mejores consejos para maximizar ganancias en las primeras seasons. Primero, enfócate en los cultivos de primavera...'
            },
            {
                usuarioId: 5,
                titulo: 'Counter-Strike 2: Primeras impresiones',
                cuerpo: 'El nuevo engine de Source 2 cambia completamente la experiencia. Las smokes ahora son volumétricas y las físicas se sienten más realistas. ¿Ya lo probaron?'
            },
            {
                usuarioId: 5,
                titulo: 'Stream de esta noche: Dark Souls 3 SL1',
                cuerpo: 'Esta noche a las 21hs arranco el desafío de completar Dark Souls 3 sin subir de nivel. Va a ser sufrimiento puro, pasen a verme sufrir en vivo 😅'
            }
        ]);
        console.log(`✅ ${publicaciones.length} publicaciones creadas`);

        // Crear comentarios
        const comentarios = await Comentario.bulkCreate([
            {
                publicacionId: 1,
                nombre: 'PixelWarrior',
                correo: 'pixelwarrior@gaming.com',
                cuerpo: '¡Felicitaciones! Malenia es brutal. Me tomó casi 100 intentos la primera vez.'
            },
            {
                publicacionId: 1,
                nombre: 'CyberMage',
                correo: 'cybermage@gaming.com',
                cuerpo: 'El secreto está en usar el Mimic Tear +10. Hace la pelea mucho más manejable.'
            },
            {
                publicacionId: 2,
                nombre: 'NinjaStrike',
                correo: 'ninjastrike@gaming.com',
                cuerpo: 'Totalmente de acuerdo. BG3 es GOTY sin dudas. Las opciones de diálogo son increíbles.'
            },
            {
                publicacionId: 3,
                nombre: 'ShadowHunter',
                correo: 'shadowhunter@gaming.com',
                cuerpo: 'Yo soy main Sage, también busco team. Te agrego!'
            },
            {
                publicacionId: 3,
                nombre: 'TheDragonSlayer',
                correo: 'dragonslayer@gaming.com',
                cuerpo: 'Si necesitan un quinto, yo juego Controller. Rango similar.'
            },
            {
                publicacionId: 4,
                nombre: 'NinjaStrike',
                correo: 'ninjastrike@gaming.com',
                cuerpo: 'Ese setup está tremendo! ¿Cuánto invertiste en total?'
            },
            {
                publicacionId: 5,
                nombre: 'PixelWarrior',
                correo: 'pixelwarrior@gaming.com',
                cuerpo: 'Excelente tiempo! Para City of Tears, te recomiendo conseguir el dash antes de entrar.'
            },
            {
                publicacionId: 6,
                nombre: 'CyberMage',
                correo: 'cybermage@gaming.com',
                cuerpo: 'Tienen que probar "Dave the Diver", es una joya indie de este año.'
            },
            {
                publicacionId: 7,
                nombre: 'TheDragonSlayer',
                correo: 'dragonslayer@gaming.com',
                cuerpo: '¿Cuál es el nivel mínimo requerido? Mi team está en Oro.'
            },
            {
                publicacionId: 7,
                nombre: 'PixelWarrior',
                correo: 'pixelwarrior@gaming.com',
                cuerpo: 'Me interesa! ¿Dónde me puedo inscribir?'
            },
            {
                publicacionId: 8,
                nombre: 'ShadowHunter',
                correo: 'shadowhunter@gaming.com',
                cuerpo: 'Buena guía! También recomiendo invertir en el invernadero lo antes posible.'
            },
            {
                publicacionId: 9,
                nombre: 'NinjaStrike',
                correo: 'ninjastrike@gaming.com',
                cuerpo: 'Las smokes volumétricas cambian completamente el meta. Hay que reaprender muchas estrategias.'
            },
            {
                publicacionId: 10,
                nombre: 'CyberMage',
                correo: 'cybermage@gaming.com',
                cuerpo: 'SL1 es masoquismo puro 😂 Pero muy entretenido de ver. Ahí estaré!'
            },
            {
                publicacionId: 10,
                nombre: 'PixelWarrior',
                correo: 'pixelwarrior@gaming.com',
                cuerpo: 'El Nameless King en SL1 va a ser épico. Suerte!'
            }
        ]);
        console.log(`✅ ${comentarios.length} comentarios creados`);

        console.log('\n🎮 ¡Base de datos poblada exitosamente con temática gamer!');
        console.log('\n📊 Resumen:');
        console.log(`   - ${usuarios.length} usuarios`);
        console.log(`   - ${publicaciones.length} publicaciones`);
        console.log(`   - ${comentarios.length} comentarios`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error al poblar la base de datos:', error);
        process.exit(1);
    }
}

seed();
