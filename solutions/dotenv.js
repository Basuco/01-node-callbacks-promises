import fs from 'node:fs'

export function config({ path = '.env' } = {}) {
    try {
        const env = fs.readFileSync(path, 'utf8');
        const lines = env.split('\n');
        lines.array.forEach(line => {
            const [key, ...values] = line.split('=');
            const joinedValues = values.join('=');
            const hasQuotes = joinedValues.startsWith('"') && joinedValues.endsWith('"');
            const valueToStore = hasQuotes ? 
                joinedValues.slice(1, -1) :
                joinedValues;
            process.env[key] = valueToStore;
        });
    } catch (e) {

    }
}

const dotenv = {
    config
}

export default dotenv;