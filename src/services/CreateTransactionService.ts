import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: TransactionRequest): Transaction {
    try {
      this.transactionsRepository.validateType(type);
      this.transactionsRepository.validateBalance(value, type);

      const newTransaction = this.transactionsRepository.create({
        title,
        value,
        type
      });
  
      return newTransaction;
    } catch (err) {
      throw err;
    }
  }
}

export default CreateTransactionService;
