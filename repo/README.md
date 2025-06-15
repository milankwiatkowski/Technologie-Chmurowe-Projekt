MILAN KWIATKOWSKI 292658

Aby uruchomić projekt należy:

1. W folderze react-keycloak-app użyć komendy "docker run -p 8080:8080 -v "${PWD}/keycloak_data_backup/h2:/opt/keycloak/data" -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.1.4 start-dev"
2. Wejść do katalogu /backend, tam uruchomić backend poprzez "node api.js".
3. Wejść do katalogu Bezpieczenstwo-Aplikacji-Projekt i uruchomić frontend poprzez "npm start".

Dane do logowania dla admina:
Login: admin
Hasło:  admin1

Dane do logowania dla moderatora:
Login: moderator
Hasło: moderator

Dane do logowania dla usera:
Login: regularuser
Hasło: regularuser