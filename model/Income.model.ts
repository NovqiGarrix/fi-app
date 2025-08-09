import { Model } from '@nozbe/watermelondb'
import { date, field, text } from '@nozbe/watermelondb/decorators'

class Income extends Model {
    static table = 'incomes'

    @text('title') title
    @field('amount') amount
    @date('created_at') createdAt
}

export default Income