import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface transactionData {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    var totalIncome = 0;
    var totalOutcome = 0;
    var totalBalance = 0;

    this.transactions.forEach(transaction => {
      if(transaction.type == 'income') {
        totalIncome += transaction.value;
        totalBalance += transaction.value;
      } else {
        totalOutcome += transaction.value;
        totalBalance -= transaction.value;
      }
    });

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalBalance
    }

    return balance;
  }

  public create({title, value, type}: transactionData): Transaction {
    const newTransaction = new Transaction({
      title,
      value,
      type
    })

    this.transactions.push(newTransaction);
    return newTransaction;
  }

  public validateType(type: string) {
    if(type !== "income" && type !== "outcome") {
      throw Error("Invalid attribute 'type', must be 'income' or 'outcome'")
    }
  }

  public validateBalance(value:number, type:string) {
    const invalidTransaction = type === "outcome" && 
                              (this.getBalance().total - value) < 0

    if(invalidTransaction) {
      throw Error('Saldo inválido');
    }
  }
}

export default TransactionsRepository;
