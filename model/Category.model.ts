import { Model } from '@nozbe/watermelondb';
import { children, text } from '@nozbe/watermelondb/decorators';
import Expense from './Expense.model';

class Category extends Model {
    static table = 'categories'

    static associations = {
        expenses: { type: 'has_many', foreignKey: 'category_id' },
    }

    @text('name') name: string;
    @text('color') color: string;

    @children('expenses') expenses: Expense[];
}

export default Category