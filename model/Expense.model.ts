import { Model } from '@nozbe/watermelondb'
import { date, field, relation, text } from '@nozbe/watermelondb/decorators'
import Category from './Category.model'

class Expense extends Model {
    static table = 'expenses'

    static associations = {
        categories: { type: 'belongs_to', key: 'category_id' },
    }

    @text('title') title: string
    @field('amount') amount: string
    @relation('categories', 'category_id') category: Category
    @date('created_at') createdAt: number
}

export default Expense