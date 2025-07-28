# Angular Survey Application

Un'applicazione moderna per la creazione e gestione di sondaggi basata su Angular 20 e Survey.js.

## 🚀 Caratteristiche

- **Dashboard interattiva** con statistiche sui sondaggi
- **Creazione di sondaggi** con Survey Creator
- **Temi personalizzabili** (chiaro/scuro)
- **UI moderna** con Angular Material
- **Responsive design** per tutti i dispositivi

## 📋 Prerequisiti

- Node.js (versione 18 o superiore)
- npm (incluso con Node.js)

## 🛠️ Installazione

1. Clona il repository:
```bash
git clone <repository-url>
cd angularSurvey
```

2. Installa le dipendenze:
```bash
cd survey-app
npm install
```

## 🚀 Avvio dell'Applicazione

### Metodo 1: Script automatico (Raccomandato)
Dalla directory root del progetto:
```bash
./start.sh
```

### Metodo 2: Manuale
```bash
cd survey-app
npm start
```

L'applicazione sarà disponibile all'indirizzo: **http://localhost:4200**

## 🛑 Arresto dell'Applicazione

### Metodo 1: Script automatico
```bash
./stop.sh
```

### Metodo 2: Manuale
Premi `Ctrl+C` nel terminale dove è in esecuzione l'applicazione.

## 📁 Struttura del Progetto

```
angularSurvey/
├── survey-app/                 # Applicazione Angular principale
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/          # Servizi e modelli core
│   │   │   ├── features/      # Moduli funzionali
│   │   │   │   ├── admin/     # Dashboard e gestione
│   │   │   │   └── survey/    # Creazione e gestione sondaggi
│   │   │   └── shared/        # Componenti condivisi
│   │   └── assets/            # Risorse statiche
│   ├── package.json
│   └── angular.json
├── ai/                        # File di configurazione AI
├── start.sh                   # Script di avvio
├── stop.sh                    # Script di arresto
└── README.md
```

## 🎨 Temi

L'applicazione supporta due temi:
- **Tema chiaro** (default)
- **Tema scuro**

Puoi cambiare tema usando il pulsante "Toggle Theme" nella dashboard.

## 🔧 Sviluppo

### Comandi utili

```bash
# Avvia il server di sviluppo
./start.sh

# Esegui i test
cd survey-app && npm test

# Build per la produzione
cd survey-app && npm run build

# Analisi del codice
cd survey-app && npm run lint
```

### Tecnologie utilizzate

- **Angular 20** - Framework principale
- **Angular Material** - Componenti UI
- **Survey.js** - Libreria per sondaggi
- **RxJS** - Gestione reattiva
- **TypeScript** - Linguaggio di programmazione

## 📝 TODO

- [ ] Implementare autenticazione utenti
- [ ] Aggiungere backend API
- [ ] Implementare salvataggio sondaggi
- [ ] Aggiungere analisi risultati
- [ ] Implementare condivisione sondaggi

## 🤝 Contribuire

1. Fai un fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Committa le tue modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Pusha al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.