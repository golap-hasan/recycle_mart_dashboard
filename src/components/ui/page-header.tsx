"use client"

const PageHeader = ({title, description}: {title: string, description: string}) => {
    return (
        <div className="space-y-2">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground">
                {description}
            </p>
        </div>
    )
}

export default PageHeader