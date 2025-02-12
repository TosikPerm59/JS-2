/**
 * @typedef Person
 * @type {object}
 * @property {string} name - имя
 * @property {Array<string>} interests - интересы
 * @property {string} email - почта
 * @property {{ startDate: Date, endDate: Date }} freeRange - диапазон для встречи
 */

/**
 * @typedef Group
 * @type {object}
 * @property {() => Array<Person>} getAll - получить всех участников группы
 * @property {(person: Person) => boolean} includePerson - добавить человека к списку участников
 * @property {(email: string) => boolean} excludePerson - удалить человека из списка участников
 */

/**
 * @param {string} interest - интерес группы
 * @returns {Group} созданная группа
 */


function createGroup(interest) {
    const personsList = []
    return{
        getAll: () => personsList, 

        includePerson: (person) => {
            let checkInterests = person.interests?.includes(interest);
            let checkEmail = personsList.every(({ email }) => email !== person.email);
            if (checkEmail && checkInterests) {
                personsList.push(person);
                return true;
            }
            else return false;
        }, 

        excludePerson: (email) => {
            const checkEmail = personsList.filter((person) => (person.email != email) )
            if(personsList.length > checkEmail.length ) return true;
            else return false;
        }    
    }
};


/**
 * @param {Group} group - группа людей
 * @param {Date} meetingDate - дата встречи
 * @returns {number} кол-во людей, готовых в переданную дату посетить встречу 
 */


function findMeetingMembers(group, meetingDate) {
    if (!(meetingDate instanceof Date) || isNaN(meetingDate.valueOf()))
        return 0;
    const persons = group
                        .getAll()
                        .filter((person) =>
                            (meetingDate >= person.freeRange.startDate && meetingDate <= person.freeRange.endDate));
    return persons.length;    
    }


/**
 * @param {Group} group - группа людей
 * @returns {Date} дата, в которую могут собраться максимальное кол-во человек из группы
 */


function findMeetingDateWithMaximumMembers(group) {
    if(!group.getAll) return null;
    
    let bestDate = null;
    let maximumPersons = 0;
    group
        .getAll()
        .map(person => {
                let date = person.freeRange.startDate;
                let personsCount = findMeetingMembers(group, person.freeRange.startDate);
                if (personsCount > maximumPersons) {
                    bestDate = date;
                    maximumPersons = personsCount;
                }
            });
    return bestDate;
}


module.exports = { createGroup, findMeetingMembers, findMeetingDateWithMaximumMembers };
