FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
RUN mkdir -p /app/resources
RUN chmod 777 /app/resources/
WORKDIR /app


# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
COPY Resources /app/Resources
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.0
WORKDIR /app
EXPOSE 80
COPY Resources /app/Resources
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "backend.dll"]
