import { Model, Query } from '@nozbe/watermelondb';
import { children, text } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import Expense from './Expense.model';

class Category extends Model {
    static table = 'categories'

    static associations: Associations = {
        expenses: { type: 'has_many', foreignKey: 'category_id' },
    }

    @text('name') name!: string;
    @text('color') color!: string;

    @children('expenses') expenses!: Query<Expense>;
}

export default Category