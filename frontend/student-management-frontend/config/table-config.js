export const getTableHeadersByType = (type) => {
    let result = [];
    switch(type) {
        case 'getCommonsStudents':
            result = [
                {
                    header: '#',
                    value: 'id'
                },
                {
                    header: 'Student Email',
                    value: 'email'
                },
                {
                    header: 'Status',
                    value: 'isSuspended'
                },
                {
                    header: 'Actions',
                    value: 'buttons'
                }
            ]
            
            break;
        default: result = false; break;
    }

    return result;
}