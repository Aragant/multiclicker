const fs = require('fs');
const { execSync } = require('child_process');

const envLocal = '.env.local';
const envBackup = '.env.local.backup';
let renamed = false;

try {
  // Toujours sauvegarder .env.local si présent
  if (fs.existsSync(envLocal)) {
    fs.renameSync(envLocal, envBackup);
    console.log('📝 .env.local sauvegardé sous .env.local.backup');
    renamed = true;
  }

  // Lancer le build
  console.log('🚀 Démarrage du build...');
  execSync('next build', { stdio: 'inherit' });

} catch (error) {
  console.error('❌ Erreur pendant le build :', error.message);
  process.exitCode = 1;

} finally {
  // Restaurer .env.local seulement si on l’avait renommé
  if (renamed && fs.existsSync(envBackup)) {
    fs.renameSync(envBackup, envLocal);
    console.log('✅ .env.local restauré');
  }
}
