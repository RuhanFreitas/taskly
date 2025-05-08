import { formatDateProps } from '../types/fomatDateProps'

export const formatTags = (tags: string): string[] => {
    const tagsArray = tags.split(',')
    return tagsArray
}

export const formatDateToDatabase = ({ date, time }: formatDateProps) => {
    const formatedDate = new Date(`${date}T${time}`)
    return formatedDate
}

export const formatDateToDisplay = (date: Date) => {
    const formatedDate = date.toString().split('T')[0]

    const timeArray = date.toString().split('T')[1].split(':')

    const formatedHour = `${timeArray[0]}:${timeArray[1]} ${
        Number(timeArray[0]) >= 12 ? 'pm' : 'am'
    }`

    return { formatedDate, formatedHour }
}
