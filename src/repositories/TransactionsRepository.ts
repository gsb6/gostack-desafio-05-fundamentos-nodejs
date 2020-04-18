import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
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

  public getIncome(): number {
    const incomeFilter = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const incomeSum = incomeFilter.reduce((acc, cur) => acc + cur.value, 0);

    return incomeSum;
  }

  public getOutcome(): number {
    const outcomeFilter = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const outcomeSum = outcomeFilter.reduce((acc, cur) => acc + cur.value, 0);

    return outcomeSum;
  }

  public getBalance(): Balance {
    return {
      income: this.getIncome(),
      outcome: this.getOutcome(),
      total: this.getIncome() - this.getOutcome(),
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
